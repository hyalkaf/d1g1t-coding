import React from "react";
import { consecutive, findIdInTreeByValue, TreeNode, highlightMatch } from ".";

describe("consecutive()", () => {
  const cases = [
    {
      input: [4, 2, 1, 6, 5],
      output: 3
    },
    {
      input: [5, 5, 1, 3, 8, 10],
      output: 1
    },
    {
      input: [],
      output: 0
    }
  ];
  for (const c of cases) {
    it(`consecutive - basic test, expected output = ${c.output}`, () => {
      expect(consecutive(c.input)).toEqual(c.output);
    });
  }
});

describe("findIdInTreeByValue()", () => {
  const testTree: TreeNode[] = [
    { id: 1, values: [100, 101] },
    { id: 2, values: [200, 201] },
    {
      id: 3,
      values: [300, 301],
      children: [
        { id: 10, values: [1000, 1001] },
        { id: 9, values: [900, 901] },
        {
          id: 8,
          values: [800, 801],
          children: [
            { id: 7, values: [700, 701] },
            { id: 6, values: [600, 601] }
          ]
        }
      ]
    }
  ];
  const cases = [
    {
      input: 7001,
      output: undefined
    },
    {
      input: 601,
      output: 6
    }
  ];

  for (const c of cases) {
    it(`findIdInTreeByValue - basic test, expected output = ${c.output}`, () => {
      expect(findIdInTreeByValue(testTree, c.input)).toBe(c.output);
    });
  }
});

describe("highlightMatch()", () => {
  it("returns array of JSX with search highlighted", () => {
    const result = highlightMatch("Micheal Rosen", "ros");
    const expected = [
      <React.Fragment key={0}>Micheal </React.Fragment>,
      <strong key={1}>Ros</strong>,
      <React.Fragment key={2}>en</React.Fragment>
    ];

    expect(result).toEqual(expected);
  });

  it("returns array of JSX when no match is found", () => {
    const result = highlightMatch("Micheal Rosen", "not-found");
    const expected = [<React.Fragment key={0}>Micheal Rosen</React.Fragment>];

    expect(result).toEqual(expected);
  });

  it("returns an array of JSX for multiple matches", () => {
    const result = highlightMatch(
      "Multi Test returns multiple results",
      "multi"
    );
    const expected = [
      <strong key={0}>Multi</strong>,
      <React.Fragment key={1}> Test return </React.Fragment>,
      <strong key={2}>multi</strong>,
      <React.Fragment key={3}>ple results</React.Fragment>
    ];

    expect(result).toEqual(expected);
  });
});
