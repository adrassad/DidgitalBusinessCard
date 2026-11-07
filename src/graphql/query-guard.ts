import { GraphQLError, Kind, type ASTVisitor, type ValidationContext } from 'graphql';

/** Rejects oversized selections. Introspection stays available for Apollo Sandbox. */
export function queryGuard(maxComplexity: number, maxDepth: number) {
  return (context: ValidationContext): ASTVisitor => {
    let complexity = 0;
    let depth = 0;
    let maxSeenDepth = 0;
    let rootFields = 0;
    let dataRootFields = 0;

    return {
      Field: {
        enter(node, _key, parent) {
          complexity += 1;
          depth += 1;
          if (depth > maxSeenDepth) {
            maxSeenDepth = depth;
          }
          if (
            parent != null &&
            !Array.isArray(parent) &&
            'kind' in parent &&
            parent.kind === Kind.OPERATION_DEFINITION
          ) {
            rootFields += 1;
            if (node.name.value !== '__schema' && node.name.value !== '__type') {
              dataRootFields += 1;
            }
          }
        },
        leave() {
          depth -= 1;
        },
      },
      Document: {
        leave(node) {
          if (rootFields > 0 && dataRootFields === 0) {
            return;
          }
          if (complexity > maxComplexity) {
            context.reportError(
              new GraphQLError(
                `Query complexity ${complexity} exceeds the maximum of ${maxComplexity}.`,
                { nodes: node },
              ),
            );
          }
          if (maxSeenDepth > maxDepth) {
            context.reportError(
              new GraphQLError(
                `Query depth ${maxSeenDepth} exceeds the maximum of ${maxDepth}.`,
                { nodes: node },
              ),
            );
          }
        },
      },
    };
  };
}
