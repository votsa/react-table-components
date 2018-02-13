import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import Table from '../../components/Table';

const columns = [
  { id: 1, title: 'First name', prop: 'first_name', visible: true },
  { id: 2, title: 'Last name', prop: 'last_name', visible: true },
];

const dataArray = [
  { id: 1, first_name: 'Jhon', last_name: 'Dou' },
  { id: 2, first_name: 'Vasily', last_name: 'Pupkin' },
];

describe('<Table />', () => {
  it('render table', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <Table
        keys="id"
        columns={columns}
        dataArray={dataArray}
      />,
    );

    const result = shallowRenderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('shows empty message if no data', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <Table
        keys="id"
        columns={columns}
        dataArray={[]}
        noDataMessage="No data"
      />,
    );

    const result = shallowRenderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
