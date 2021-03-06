import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import  Moment from 'react-moment';

import { deleteEducation } from '../../redux/actions/profile';

const Education = ({ education, deleteEducation }) => {
  const schools = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{edu.from}</Moment> - {
          edu.to === null ? ('Now') : (<Moment format='YYYY/MM/DD'>{edu.to}</Moment>)
        }
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => {
            deleteEducation(edu._id);
            document.documentElement.scrollTop = 0;
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Education history</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{schools}</tbody>
      </table>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteEducation: (id) => dispatch(deleteEducation(id))
});

export default connect(null, mapDispatchToProps)(Education);
