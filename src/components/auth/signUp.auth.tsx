import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { CircularProgress, TextField } from '@mui/material'
import { signUpAction } from '@/action/action'
import { toast } from '@/customize/mui/toast'

export interface SignUpFormValues {
  username: string
  password: string
  confirmPassword: string
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 5,
  borderRadius: '5px',
}

const validationSchema = Yup.object({
  username: Yup.string().required('Bắt buộc'),
  password: Yup.string().required('Bắt buộc').min(6, 'Ít nhất 6 ký tự'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), ''],
    'Mật khẩu không khớp'
  ),
})

export default function SignUpModal({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const initialValues: SignUpFormValues = {
    username: '',
    password: '',
    confirmPassword: '',
  }

  const handleSubmit = async (values: SignUpFormValues) => {
    try {
      const data = await signUpAction({
        ...values,
        type: 'CREDENTIALS',
        role: 'USER',
      })
      console.log('data', data)
      if (data) toast.success('Đăng ký thành công')
      else toast.error('Tài khoản đã tồn tại')
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Box onClick={handleOpen}>{children}</Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign={'center'}
            sx={{ marginBottom: '10px' }}
          >
            Tạo tài khoản
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              /* and other goodies */
              errors,
              touched,
              isSubmitting,
            }) => (
              <Form>
                <Field name="username">
                  {({ field, meta }: any) => (
                    <TextField
                      {...field}
                      label="Tên người dùng"
                      variant="outlined"
                      fullWidth
                      error={touched.username && Boolean(errors.username)}
                      helperText={touched.username && errors.username}
                      sx={{
                        '.mui-1ntivaq-MuiInputBase-root-MuiOutlinedInput-root':
                          {
                            height: '50px',
                          },
                      }}
                    />
                  )}
                </Field>

                <Field name="password">
                  {({ field, meta }: any) => (
                    <TextField
                      {...field}
                      label="Mật khẩu"
                      variant="outlined"
                      fullWidth
                      type="password"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      sx={{
                        marginTop: '12px',
                        '.mui-1ntivaq-MuiInputBase-root-MuiOutlinedInput-root':
                          {
                            height: '50px',
                          },
                      }}
                    />
                  )}
                </Field>

                <Field name="confirmPassword">
                  {({ field, meta }: any) => (
                    <TextField
                      {...field}
                      type="password"
                      label="Nhập lại mật khẩu"
                      variant="outlined"
                      fullWidth
                      error={
                        touched.confirmPassword &&
                        Boolean(errors.confirmPassword)
                      }
                      helperText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                      sx={{
                        marginTop: '12px',
                        '.mui-1ntivaq-MuiInputBase-root-MuiOutlinedInput-root':
                          {
                            height: '50px',
                          },
                      }}
                    />
                  )}
                </Field>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{
                    marginTop: '12px',
                    '.MuiButton-root': {
                      height: '50px',
                    },
                  }}
                >
                  {isSubmitting && (
                    <CircularProgress
                      size={20}
                      sx={{
                        color: 'white',
                        marginRight: '10px',
                      }}
                    />
                  )}
                  Đăng ký
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  )
}
