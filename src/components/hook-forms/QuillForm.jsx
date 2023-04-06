import { useFormContext, Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function QuillForm({ name, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <>
          <ReactQuill
            theme="snow"
            formats={QuillForm.formats}
            style={{ height: 160 }}
            onChange={field.onChange}
            onBlur={field.onBlur}
            fullWidth
            value={field.value}
            {...other}
          />
          {error && (
            <FormControl color="error">
              <FormHelperText id="my-helper-text" sx={{ color: 'red' }}>
                {error.message}
              </FormHelperText>
            </FormControl>
          )}
        </>
      )}
    />
  );
}
