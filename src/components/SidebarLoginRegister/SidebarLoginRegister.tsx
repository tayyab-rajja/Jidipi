import {FC} from 'react';

import TabsFormsUserData from 'src/components/TabsFormsUserData';
// import SettingNameEmail from 'src/components/SettingNameEmail';
import Login from 'src/components/Login';

import styles from './SidebarLoginRegister.module.css';

const tabsData = [
  {
    name: 'register',
    panel: <h1>Register</h1>
  },
  
  {
    name: 'login',
    panel: <Login/>
  },
]

const SidebarLoginRegister:FC = () => {
  return (
    <div className={styles['Body-LoginRegisterContainer']}>
      <TabsFormsUserData
        tabsData={tabsData}
      />
    </div>
  )
}

export default SidebarLoginRegister




// import {FC} from 'react';

// import Image from 'next/image';

// import clsx from 'clsx';

// import styles from './styles.module.css';
// import formStyles from '../FormUserData/FormUserData.module.css';

// import LoginWithSocialBtn from '../LoginWithSocialBtn';
// import Divider from '../Divider';
// import ButtonUserData from '../ButtonUserData';
// import InputUserData from '../InputUserData';
// import RememberMe from '../RememberMe';
// import FormUserData from '../FormUserData';
// import SectionUserData from '../SectionUserData';
// import TabsFormsUserData from '../TabsFormsUserData';
// import Link from 'next/link';

// import googleIcon from './google-logo.png';
// import facebookIcon from './facebook-logo.png';

// const googleIconComponent = <Image src={googleIcon} alt='logo' width={20} height={20}/>

// const facebookIconComponent = <Image src={facebookIcon} alt='logo' width={20} height={20}/>

// const tabLogin = (
//   <SectionUserData>
//     <FormUserData>
//       <>
//         <LoginWithSocialBtn imgComponent={googleIconComponent} socialName='Google' action={() => alert('Write your Login function')} className={formStyles['form__elem']} />

        
//         <LoginWithSocialBtn imgComponent={facebookIconComponent} socialName='Facebook' action={() => alert('Write your Login function')} className={formStyles['form__elem']} />

//         <Divider label='OR LOGIN WITH EMAIL'/>
        
//         <InputUserData type='email' placeholder='Email'/>

//         <InputUserData type='password' placeholder='Password'/>

//         <RememberMe/>
        
//         <ButtonUserData label='LOGIN' className={clsx(styles['setting-account__btn'])} action={() => alert('Write your Login function')}/>
//       </>
//     </FormUserData>
//   </SectionUserData>
// );

// const backToLogin = (
//   <div className={styles['login-register__back-to-login']}>Go back to <Link href='/'><a className={styles['login-register__a']}> Login</a></Link></div>
// )

// const tabRegister = (
//   <SectionUserData>
//     <>
//       <FormUserData>
//         <>
//           <Divider label='RESET PASSWORD'/>
          
//           <InputUserData type='email' placeholder='Email'/>

//           <InputUserData type='password' placeholder='Password'/>

//           <InputUserData type='password' placeholder='Password Confirm'/>
          
//           <ButtonUserData label='RESET PASSWORD' className={clsx(styles['setting-account__btn'])} action={() => alert('Writу your Reset Password function')}/>
//         </>
//       </FormUserData>
      
//       {backToLogin}
//     </>
//   </SectionUserData>
// );


// const SidebarLoginRegister:FC = () => {
//   return (
//     <TabsFormsUserData
//       tabName1='REGISTER'
//       tabName2='LOGIN'
//       tab1={tabRegister}
//       tab2={tabLogin}

//       className={styles['body__login-register']}
//     >
//     </TabsFormsUserData>
//   )
// }

// export default SidebarLoginRegister