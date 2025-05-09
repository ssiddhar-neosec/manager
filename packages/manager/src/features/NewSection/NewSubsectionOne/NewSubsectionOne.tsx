import { useCreateWafConfig } from '@linode/queries';
import { Box, Checkbox, Paper, TextField, Typography } from '@linode/ui';
import { useEffect } from 'react';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';

import type { SubmitHandler } from 'react-hook-form';

interface WafConfigForm {
  includeAllHostnames: boolean;
  isCustomRulesEnabled: boolean;
  isProtectionsEnabled: boolean;
  name: string;
}

export const NewSubsectionOne = () => {
  const createWafConfigMutation = useCreateWafConfig();

  const { control, handleSubmit, setValue } = useForm<WafConfigForm>();
  const onSubmit: SubmitHandler<WafConfigForm> = (data) => {
    createWafConfigMutation.mutate(getWafConfigDTO(data));
  };

  const getWafConfigDTO = (formData: WafConfigForm): any => {
    return {
      hostnames: formData.includeAllHostnames
        ? [{ host: '*' }]
        : [{ host: 'akamai.com' }, { host: 'test.akamai.com' }],
      is_custom_rules_enabled: formData.isCustomRulesEnabled,
      is_protections_enabled: formData.isProtectionsEnabled,
      name: formData.name,
      status: 'ACTIVE',
    };
  };

  useEffect(() => {
    setValue('isProtectionsEnabled', false);
    setValue('isCustomRulesEnabled', false);
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper
          sx={{
            marginBottom: '20px',
          }}
        >
          <Box alignItems="flex-start" display="flex" flexDirection="column">
            <Typography variant="h2">1. Enter your WAF name</Typography>
            <Controller
              render={({ field }) => (
                <TextField
                  label=""
                  onChange={field.onChange}
                  placeholder="enter waf name"
                  value={field.value}
                />
              )}
              control={control}
              name="name"
            />
          </Box>
        </Paper>
        <Paper
          sx={{
            marginBottom: '20px',
          }}
        >
          <Box alignItems="flex-start" display="flex" flexDirection="column">
            <Typography variant="h2">
              2. Configure your WAF protections
            </Typography>
            <Box alignItems="center" display="flex">
              <Controller
                render={({ field }) => (
                  <Checkbox onChange={field.onChange} value={field.value} />
                )}
                control={control}
                name="isProtectionsEnabled"
              />
              <Typography variant="h2">Protections</Typography>
            </Box>
            <Box alignItems="center" display="flex">
              <Controller
                render={({ field }) => (
                  <Checkbox onChange={field.onChange} value={field.value} />
                )}
                control={control}
                name="isCustomRulesEnabled"
              />
              <Typography variant="h2">Custom rules</Typography>
            </Box>
          </Box>
        </Paper>
        <Paper
          sx={{
            marginBottom: '20px',
          }}
        >
          <Box display="flex" flexDirection="column">
            <Typography variant="h2">3. Define Protected Resources</Typography>
            <Box alignItems="center" display="flex" flexDirection="row">
              <Controller
                render={({ field }) => (
                  <Checkbox onChange={field.onChange} value={field.value} />
                )}
                control={control}
                name="includeAllHostnames"
              />
              <Typography variant="h2">Include all hostnames</Typography>
            </Box>
          </Box>
        </Paper>
        <Paper
          sx={{
            marginBottom: '20px',
          }}
        >
          <Box display="flex">
            <Typography variant="h2">4. Summary</Typography>
          </Box>
        </Paper>
        <input type="submit" />
      </form>
    </div>
  );
};
