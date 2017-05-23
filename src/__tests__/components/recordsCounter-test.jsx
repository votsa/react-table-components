import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import RecordsCounter from '../../components/RecordsCounter';

describe('<RecordsCounter />', () => {
  it('shows records count', () => {
    const shallowRenderer = createRenderer();
    const expected = 'Showing 1 to 10 of 1000 records';

    shallowRenderer.render(
      <RecordsCounter
        total={1000}
        currentPage={0}
        perPage={10}
      />,
    );

    const result = shallowRenderer.getRenderOutput();

    expect(result.props.children).toEqual(expected);
  });
});
