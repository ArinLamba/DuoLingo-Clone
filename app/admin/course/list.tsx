import { Datagrid, List, TextField } from "react-admin";

import React from 'react'

export const CourseList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id"/>
        <TextField source="title"/>
        <TextField source="imageSrc"/>
      </Datagrid>
    </List>
  );
};