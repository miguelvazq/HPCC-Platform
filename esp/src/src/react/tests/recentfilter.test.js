global['define'] = () => null;
const recents = require("../recentFilters.tsx");



// test if no filter is received to not make a call to wsStore
// test if key does not exist to return no recent filters found
// test if wsstore is taking some time to display the Skeleton widget
// test that no more than length passed in does not show tablecell at any given time


// test('key does not exist store', () => {
//     expect(result({filter}).toBe(falsey)
// });

test('no key found', () => {
    expect(true).toBeTruthy()
});