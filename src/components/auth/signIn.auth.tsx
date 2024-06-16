'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import {
  Button,
  CircularProgress,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HttpsIcon from '@mui/icons-material/Https'
import Link from 'next/link'
import GitHubIcon from '@mui/icons-material/GitHub'
import GoogleIcon from '@mui/icons-material/Google'
import SignUpModal from './signUp.auth'
import { signIn, useSession } from 'next-auth/react'
import ReplyAllIcon from '@mui/icons-material/ReplyAll'
import { theme } from '@/theme/theme'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from '@/customize/mui/toast'
import { revalidatePath } from 'next/cache'
import { reRenderHeader } from '@/action/action'

interface SignInProps {
  username: string
  password: string
}

export default function SignIn() {
  const { register, handleSubmit } = useForm<SignInProps>()
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()

  const onSubmit: SubmitHandler<SignInProps> = async (data) => {
    try {
      setIsLoading(true)

      const result = await signIn('credentials', {
        redirect: false,
        username: data.username,
        password: data.password,
      })

      if (result?.ok) {
        reRenderHeader()
        router.push('/')
      } else {
        toast.error(
          'Đăng nhập thất bại, vui lòng kiểm tra lại thông tin đăng nhập'
        )
      }
    } catch (error) {
      console.log(error)
      toast.error('Đăng nhập thất bại')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage:
          'linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(91,103,81,0.9696472338935574) 35%, rgba(0,212,255,1) 100%)',
      }}
    >
      <Grid
        sx={{
          width: {
            xs: '100%',
            sm: '65%',
            md: '32%',
          },
          minHeight: '70vh',
          padding: '0px 10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link href={'/'}>
            <ReplyAllIcon
              sx={{
                color: 'white',
                cursor: 'pointer',
              }}
            />
          </Link>
          <Typography
            sx={{
              typography: {
                sm: 'h5',
                xs: 'body2',
                color: '#ffffff',
                marginTop: '10px',
              },
            }}
            align="center"
          >
            ĐĂNG NHẬP / ĐĂNG KÝ
          </Typography>
        </Box>
        <Box
          component={'form'}
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 2,
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            label="Tên đăng nhập"
            color="secondary"
            {...register('username', { required: true })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon style={{ color: 'white' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiFormLabel-root': {
                color: 'white',
              },
              '& .MuiFormLabel-root.Mui-focused': {
                color: 'white',
              },
              '& .MuiOutlinedInput-root': {
                height: '40px',
                color: 'white',
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
            }}
          />

          <TextField
            fullWidth
            label="Mật khẩu"
            color="secondary"
            type="password"
            {...register('password', { required: true })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HttpsIcon style={{ color: 'white' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              marginTop: '10px',
              '& .MuiFormLabel-root': {
                color: 'white',
              },
              '& .MuiFormLabel-root.Mui-focused': {
                color: 'white',
              },
              '& .MuiOutlinedInput-root': {
                height: '40px',
                color: 'white',
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
            }}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Button
              variant="contained"
              sx={{
                marginBottom: '10px',
                width: '100%',
              }}
              type="submit"
            >
              {isLoading && (
                <CircularProgress
                  size={20}
                  sx={{
                    color: 'white',
                    marginRight: '10px',
                  }}
                />
              )}
              <span>Đăng nhập</span>
            </Button>
          </Box>
        </Box>

        <Box>
          <Typography
            sx={{
              color: 'white',
              textAlign: 'center',
              fontSize: '12px',
            }}
          >
            Quên mật khẩu?{' '}
            <Link href="#">
              <Typography
                component="span"
                sx={{
                  fontSize: '12px',
                  color: '#49B9FF',
                }}
              >
                Lấy lại mật khẩu
              </Typography>
            </Link>
          </Typography>
        </Box>
        <Box>
          <SignUpModal>
            <Button
              variant="outlined"
              sx={{
                margin: '2px auto',
                width: '100%',
                color: 'orange',
                border: 'none',
                '&:hover': {
                  backgroundColor: 'orange',
                  color: 'white',
                },
              }}
            >
              Đăng ký ngay
            </Button>
          </SignUpModal>
        </Box>
        <Divider
          sx={{
            fontSize: '12px',
            fontStyle: 'italic',
            color: '#ccabab',
            margin: '8px 0',
          }}
        >
          Hoặc đăng nhập với
        </Divider>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            border: '1px solid white',
            padding: '10px',
            cursor: 'pointer',
            borderRadius: '5px',
            '&:hover': {
              backgroundColor: theme.palette.grey[700],
            },
          }}
          onClick={(e) => {
            signIn('github')
          }}
        >
          <GitHubIcon style={{ color: 'white', fontSize: '32px' }} />
          <Typography
            sx={{
              marginLeft: '18%',
              color: 'white',
            }}
          >
            Đăng nhập với Github
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            border: '1px solid white',
            padding: '10px',
            cursor: 'pointer',
            marginTop: '10px',
            borderRadius: '5px',
            '&:hover': {
              backgroundColor: theme.palette.grey[700],
            },
          }}
          onClick={() => signIn('google')}
        >
          <GoogleIcon style={{ color: 'white', fontSize: '32px' }} />
          <Typography
            sx={{
              marginLeft: '18%',
              color: 'white',
            }}
          >
            Đăng nhập với Google
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}
