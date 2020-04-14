import React from 'react';

const Date = (date) => <p>Posted on {new Date(date).toDateString()}</p>;

export default Date;
