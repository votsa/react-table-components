import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import RecordsCounter from '../../components/RecordsCounter';

describe('<RecordsCounter />', () => {
  it('shows records count', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordsCounter
        total={1000}
        currentPage={0}
        perPage={10}
      />,
    );

    const result = shallowRenderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
