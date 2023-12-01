import { Suspense, lazy } from 'react';
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import Layout from '@/layout/Layout';
import DashBoard from '@/pages/dashboard/DashBoard';
import Notice from '@/pages/notice/Notice';
import Loading from '@components/common/Loading';
import QR from '@/pages/qr/QR';
import Setting from '@/pages/setting/Setting';
import Curriculum from '@/pages/curriculum/Curriculum';
import Intro from '@/pages/intro/Intro';
import Login from '@/pages/login/Login';
import NoticeEdit from '@/pages/notice/NoticeEdit';
import AttendanceRenew from '@/pages/attendance_renew/AttendanceRenew';
// import AttendanceRenewProfile from '@/pages/attendance_renew/AttendanceRenewProfile';

const NoticeSave = lazy(() => import('@/pages/notice/NoticeSave'));
const NoticeDetail = lazy(() => import('@/pages/notice/NoticeDetail'));
const Signup = lazy(() => import('@/pages/signup/Signup'));
const AttendanceRenewProfile = lazy(() =>
  import('@/pages/attendance_renew/AttendanceRenewProfile')
);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<DashBoard />} />
        <Route path='/notice' element={<Notice />} />
        <Route path='/qr' element={<QR />} />
        <Route path='/setting' element={<Setting />} />
        <Route path='/curriculum' element={<Curriculum />} />
        <Route path='/attendance' element={<AttendanceRenew />} />
      </Route>
      <Route path='/intro'>
        <Route index element={<Intro />} />
      </Route>
      <Route path='/login'>
        <Route index element={<Login />} />
      </Route>
      <Route path='/notice'>
        <Route
          path='saved'
          element={
            <Suspense fallback={<Loading />}>
              <NoticeSave />
            </Suspense>
          }
        />
        <Route
          path='edit/:id'
          element={
            <Suspense fallback={<Loading />}>
              <NoticeEdit />
            </Suspense>
          }
        />
        <Route
          path=':id'
          element={
            <Suspense fallback={<Loading />}>
              <NoticeDetail />
            </Suspense>
          }
        />
      </Route>
      <Route
        path='/signup/:page'
        element={
          <Suspense fallback={<Loading />}>
            <Signup />
          </Suspense>
        }
      />
    </>
  )
);
