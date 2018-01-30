import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BootstrapContainer } from 'react-table-components';

import 'styles/styles';

const UserPic = (row) => (
  <div className="text-center">
    <img src={row.pic} />
  </div>
);

const EditBtn = () => (
  <div className="text-center">
    <button className="btn btn-xs btn-success">Edit</button>
  </div>
);

const generateRowProps = (row) => {
  const options = {};

  if (row.gender === 'Male') {
    options.className = 'info';
  }

  if (row.gender === 'Female') {
    options.className = 'warning';
  }

  return options;
};

function BaseTable(data) {
  const columns = [
    { id: 1, title: 'Avatar', render: UserPic, visible: false, width: '50px' },
    { id: 2, title: 'First name', prop: 'first_name', width: '150px' },
    { id: 3, title: 'Last name', prop: 'last_name', width: '150px' },
    { id: 4, title: 'Email', prop: 'email' },
    { id: 5, title: 'Gender', prop: 'gender', width: '85px' },
    { id: 6, title: 'Ip address', prop: 'ip_address', width: '150px' },
    { id: 7, title: 'Country', prop: 'country.name', width: '150px' },
    { id: 8, title: 'Code', prop: 'country.code', width: '80px' },
    { id: 9, title: 'City', prop: 'city.name' },
    { id: 10, title: 'Action', render: EditBtn, width: '50px' },
  ];

  const sortBy = {
    prop: 'country.name',
    order: 'asc',
  };

  return (
    <div className="container">
      <br />
      <BootstrapContainer
        keys="id"
        tableClassName="table table-bordered table-striped"
        columns={columns}
        dataArray={data}
        sortBy={sortBy}
        onDragColumnCallback={(cols) => console.log(cols)}
        onToggleColumnVisibilityCallback={(cols) => console.log(cols)}
        onSortCallback={(sortObj) => console.log(sortObj)}
        onChangePageCallback={(nextPage) => console.log(nextPage)}
        generateRowProps={generateRowProps}
        pageSizeOptions={[5, 10, 50]}
        draggable
        sortable
      />
    </div>
  );
}

fetch('/data.json')
  .then((res) => res.json())
  .then((rows) => {
    ReactDOM.render(BaseTable(rows), document.getElementById('app'));
  });
