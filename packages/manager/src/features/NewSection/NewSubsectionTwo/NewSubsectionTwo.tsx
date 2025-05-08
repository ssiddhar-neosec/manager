import React from 'react';
import { LandingHeader } from 'src/components/LandingHeader';
import { DebouncedSearchTextField } from 'src/components/DebouncedSearchTextField';
import { TableHead } from 'src/components/TableHead';
import { TableRow } from 'src/components/TableRow';
import { TableCell } from 'src/components/TableCell';
import { TableBody } from 'src/components/TableBody';
import { TableRowEmpty } from 'src/components/TableRowEmpty/TableRowEmpty';
import { Table } from 'src/components/Table';
export const NewSubsectionTwo = () => {
  const onSearch = (_searchString: string) => {};
  // Dummy data
  const wafConfigurations = {
    data: [
      {
        name: 'WAF Config Alpha',
        status: 'Active',
        nodeName: 'Node-1',
        deployedOn: '2025-05-05',
      },
      {
        name: 'WAF Config Beta',
        status: 'Inactive',
        nodeName: 'Node-2 | Node-3',
        deployedOn: '2025-04-22',
      },
      {
        name: 'WAF Config Gamma',
        status: 'Deploying',
        nodeName: 'Node-4',
        deployedOn: '2025-05-01',
      },
    ],
  };
  return (
    <>
      <LandingHeader
        entity="WAF"
        onButtonClick={() => {}}
        title="WAF Configurations"
      />
      <DebouncedSearchTextField
        clearable
        debounceTime={250}
        hideLabel
        label="Search"
        onSearch={onSearch}
        placeholder="Filter"
        sx={{ mb: 4 }}
        value={''}
      />
      <Table aria-label="List of WAF Configurations">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '40%' }}>Configuration name</TableCell>
            <TableCell sx={{ width: '20%' }}>Status</TableCell>
            <TableCell sx={{ width: '20%' }}>Node names</TableCell>
            <TableCell sx={{ width: '20%' }}>Deployed on</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {wafConfigurations?.data.length === 0 && (
            <TableRowEmpty colSpan={6} />
          )}
          {wafConfigurations?.data.map((wafConfiguration, idx) => (
            <TableRow key={idx}>
              <TableCell>{wafConfiguration.name}</TableCell>
              <TableCell>{wafConfiguration.status}</TableCell>
              <TableCell>{wafConfiguration.nodeName}</TableCell>
              <TableCell>{wafConfiguration.deployedOn}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
