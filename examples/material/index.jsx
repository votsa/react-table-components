import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { MaterialContainer } from 'react-table-components';

import 'styles/styles';

const UserPic = (row) => (
  <div className="text-center">
    <img src={row.pic} />
  </div>
);

const EditBtn = (row) => (
  <div className="text-center">
    <button className="mdl-button mdl-button--raised">Edit</button>
  </div>
);

function BaseTable(data) {
  const columns = [
    { id: 1, title: 'Avatar', render: UserPic, visible: false, width: '50px', headerClass: 'mdl-data-table__cell--non-numeric', cellClass: 'mdl-data-table__cell--non-numeric' },
    { id: 2, title: 'First name', prop: 'first_name', width: '150px', headerClass: 'mdl-data-table__cell--non-numeric', cellClass: 'mdl-data-table__cell--non-numeric' },
    { id: 3, title: 'Last name', prop: 'last_name', width: '150px', headerClass: 'mdl-data-table__cell--non-numeric', cellClass: 'mdl-data-table__cell--non-numeric' },
    { id: 4, title: 'Email', prop: 'email', headerClass: 'mdl-data-table__cell--non-numeric', cellClass: 'mdl-data-table__cell--non-numeric' },
    { id: 5, title: 'Gender', prop: 'gender', width: '85px', headerClass: 'mdl-data-table__cell--non-numeric', cellClass: 'mdl-data-table__cell--non-numeric' },
    { id: 6, title: 'Ip address', prop: 'ip_address', width: '150px', headerClass: 'mdl-data-table__cell--non-numeric', cellClass: 'mdl-data-table__cell--non-numeric' },
    { id: 7, title: 'Country', prop: 'country.name', width: '150px', headerClass: 'mdl-data-table__cell--non-numeric', cellClass: 'mdl-data-table__cell--non-numeric' },
    { id: 8, title: 'Code', prop: 'country.code', width: '80px', headerClass: 'mdl-data-table__cell--non-numeric', cellClass: 'mdl-data-table__cell--non-numeric' },
    { id: 9, title: 'City', prop: 'city.name', headerClass: 'mdl-data-table__cell--non-numeric', cellClass: 'mdl-data-table__cell--non-numeric' },
    { id: 10, title: 'Action', render: EditBtn, width: '50px', headerClass: 'mdl-data-table__cell--non-numeric', },
  ];

  return (
    <div className="mdl-layout mdl-layout--no-drawer-button container">
      <div className="mdl-layout--fixed-drawer">
        <br />
        <MaterialContainer
          keys="id"
          className="mdl-data-table"
          columns={columns}
          onDragColumn={columns => console.log(columns)}
          onChangeColumnsVisibility={columns => console.log(columns)}
          dataArray={data}
          draggable={true}
          sortable={true}
          sortBy={{ prop: 'country.name', order: 'asc' }}
          pageSizeOptions={[5, 10, 50]}
        />
      </div>
    </div>
  );
}

fetch('/data.json')
  .then(res => res.json())
  .then((rows) => {
    ReactDOM.render(BaseTable(rows), document.getElementById('app'));
  });
