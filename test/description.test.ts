import Description from './../src/components/Description'

// Because this is a static component we just verify the results of h calls
test('Description component renders', () => {
  expect(Description()).toEqual({
    attributes: {},
    children: [
      {
        attributes: {},
        children: ['hyperapp2000'],
        key: null,
        nodeName: 'h1'
      },
      {
        attributes: {},
        children: [
          {
            attributes: {},
            children: ['With JSX and Webpack'],
            key: null,
            nodeName: 'em'
          }
        ],
        key: null,
        nodeName: 'p'
      },
      {
        attributes: {},
        children: [],
        key: null,
        nodeName: 'hr'
      }
    ],
    key: null,
    nodeName: 'div'
  })
})
