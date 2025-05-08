import * as React from 'react';
import { Paper, Box, Typography, TextField, Checkbox } from '@linode/ui';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useWafConfigs, useCreateWafConfig } from '@linode/queries';
import { useEffect } from 'react';

interface wafFormData {
  wafName: string;
  isProtectionsEnabled: boolean;
  isCustomRulesEnabled: boolean;
  includeAllHostnames: boolean;
}

export const NewSubsectionOne = () => {
  const createWafConfigMutation = useCreateWafConfig();

  const { handleSubmit, control, setValue } = useForm<wafFormData>();
  const onSubmit: SubmitHandler<wafFormData> = (data) => {
    createWafConfigMutation.mutate(transformData(data));
  };

  const transformData = (formData: wafFormData): any => {
    return {
      wafName: formData.wafName,
      isProtectionsEnabled: formData.isProtectionsEnabled,
      isCustomRulesEnabled: formData.isCustomRulesEnabled,
      hostnames: formData.includeAllHostnames
        ? [{ host: '*' }]
        : [{ host: 'akamai.com' }, { host: 'test.akamai.com' }],
    };
  };

  const { data } = useWafConfigs();

  useEffect(() => {
    setValue('isProtectionsEnabled', false);
    setValue('isCustomRulesEnabled', false);
  });

  return (
    <div>
      react query {data}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper
          sx={{
            marginBottom: '20px',
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="h2">1. Enter your WAF name</Typography>
            <Controller
              render={({ field }) => (
                <TextField
                  label=""
                  placeholder="enter waf name"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
              control={control}
              name="wafName"
            />
          </Box>
        </Paper>
        <Paper
          sx={{
            marginBottom: '20px',
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="h2">
              2. Configure your WAF protections
            </Typography>
            <Box display="flex" alignItems="center">
              <Controller
                render={({ field }) => (
                  <Checkbox value={field.value} onChange={field.onChange} />
                )}
                name="isProtectionsEnabled"
                control={control}
              ></Controller>
              <Typography variant="h2">Protections</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Controller
                render={({ field }) => (
                  <Checkbox value={field.value} onChange={field.onChange} />
                )}
                name="isCustomRulesEnabled"
                control={control}
              ></Controller>
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
            <Box display="flex" flexDirection="row" alignItems="center">
              <Controller
                render={({ field }) => (
                  <Checkbox value={field.value} onChange={field.onChange} />
                )}
                name="includeAllHostnames"
                control={control}
              ></Controller>
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
        <input type="submit"></input>
      </form>
    </div>
  );
};
