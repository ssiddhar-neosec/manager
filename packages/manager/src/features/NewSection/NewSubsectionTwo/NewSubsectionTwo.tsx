import { useWafConfigs } from '@linode/queries';
import React from 'react';

import { DebouncedSearchTextField } from 'src/components/DebouncedSearchTextField';
import { LandingHeader } from 'src/components/LandingHeader';
import { Table } from 'src/components/Table';
import { TableBody } from 'src/components/TableBody';
import { TableCell } from 'src/components/TableCell';
import { TableHead } from 'src/components/TableHead';
import { TableRow } from 'src/components/TableRow';
import { TableRowEmpty } from 'src/components/TableRowEmpty/TableRowEmpty';
export const NewSubsectionTwo = () => {
  const onSearch = (_searchString: string) => {};

  const { data: wafConfigurations } = useWafConfigs();

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
          {wafConfigurations?.data.map((wafConfiguration: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell>{wafConfiguration.name}</TableCell>
              <TableCell>{wafConfiguration.status}</TableCell>
              <TableCell>{`nodebalancer-${idx + 1}`}</TableCell>
              <TableCell>{wafConfiguration.update_dt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
