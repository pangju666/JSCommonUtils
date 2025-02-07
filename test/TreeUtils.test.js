import { TreeUtils } from 'pangju-utils';

describe('TreeUtilsTest', () => {
  test('toTreeTest', () => {
    const nodes = [
      {
        id: 1,
        parentId: null,
      },
      {
        id: 2,
        parentId: 1,
      },
      {
        id: 3,
        parentId: 2,
      },
      {
        id: 4,
        parentId: 1,
      },
    ];
    expect(TreeUtils.toTree(nodes)).toStrictEqual([
      {
        id: 1,
        parentId: null,
        children: [
          {
            id: 2,
            parentId: 1,
            children: [
              {
                id: 3,
                parentId: 2,
              },
            ],
          },
          {
            id: 4,
            parentId: 1,
          },
        ],
      },
    ]);
  });

  test('getNodesTest', () => {
    const tree = [
      {
        id: 1,
        parentId: null,
        children: [
          {
            id: 2,
            parentId: 1,
            children: [
              {
                id: 3,
                parentId: 2,
              },
            ],
          },
          {
            id: 4,
            parentId: 1,
          },
        ],
      },
    ];
    expect(TreeUtils.getNodes(tree)).toEqual([
      {
        id: 1,
        parentId: null,
      },
      {
        id: 2,
        parentId: 1,
      },
      {
        id: 3,
        parentId: 2,
      },
      {
        id: 4,
        parentId: 1,
      },
    ]);
  });

  test('forEachTest', () => {
    const tree = [
      {
        id: 1,
        parentId: null,
        children: [
          {
            id: 2,
            parentId: 1,
            children: [
              {
                id: 3,
                parentId: 2,
              },
            ],
          },
          {
            id: 4,
            parentId: 1,
          },
        ],
      },
    ];
    TreeUtils.forEach(tree, 'children', (node, parentNode) => {
      console.log(node.id, parentNode?.id);
    });
  });
});
