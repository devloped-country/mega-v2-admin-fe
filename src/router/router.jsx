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
import Note from '@/pages/note/Note';
import Student from '@/pages/student/Student';
import NavigationGuard from '../components/common/NavigationGuard';
import { SuccessPage } from '../pages/payments/Success';
import { FailPage } from '../pages/payments/Fail';
import CurriculumListChange from '../pages/curriculum/CurriculumListChange';

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
        <Route
          path='/'
          element={
            <NavigationGuard>
              <DashBoard />
            </NavigationGuard>
          }
        />
        <Route
          path='/notice'
          element={
            <NavigationGuard>
              <Notice />
            </NavigationGuard>
          }
        />
        <Route
          path='/qr'
          element={
            <NavigationGuard>
              <QR />
            </NavigationGuard>
          }
        />
        <Route
          path='/setting'
          element={
            <NavigationGuard>
              <Setting />
            </NavigationGuard>
          }
        />
        <Route
          path='/curriculum'
          element={
            <NavigationGuard>
              <Curriculum />
            </NavigationGuard>
          }
        />
        <Route
          path='/attendance'
          element={
            <NavigationGuard>
              <AttendanceRenew />
            </NavigationGuard>
          }
        />
        <Route
          path='/note'
          element={
            <NavigationGuard>
              <Note />
            </NavigationGuard>
          }
        />
        <Route
          path='/student'
          element={
            <NavigationGuard>
              <Student />
            </NavigationGuard>
          }
        />
      </Route>
      <Route path='/intro'>
        <Route index element={<Intro />} />
      </Route>
      <Route path='/login'>
        <Route index element={<Login />} />
      </Route>
      <Route path='/notice'>
        <Route
          path='saved/:courseId/:managerId'
          element={
            <Suspense fallback={<Loading />}>
              <NavigationGuard>
                <NoticeSave />
              </NavigationGuard>
            </Suspense>
          }
        />
        <Route
          path='edit/:id/:courseId'
          element={
            <Suspense fallback={<Loading />}>
              <NavigationGuard>
                <NoticeEdit />
              </NavigationGuard>
            </Suspense>
          }
        />
        <Route
          path=':id'
          element={
            <Suspense fallback={<Loading />}>
              <NavigationGuard>
                <NoticeDetail />
              </NavigationGuard>
            </Suspense>
          }
        />
      </Route>
      <Route
        path='/curriculum'
        element={
          <Suspense fallback={<Loading />}>
              <NavigationGuard>
                <CurriculumListChange />
              </NavigationGuard>
            </Suspense>
        }
      >
        <Route
          path='/curriculum/listChange'
          element={
            <NavigationGuard>
              <CurriculumListChange />
            </NavigationGuard>
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
      <Route
        path='/attendance/profile/:id/:courseId'
        element={
          <Suspense fallback={<Loading />}>
            <NavigationGuard>
              <AttendanceRenewProfile />
            </NavigationGuard>
          </Suspense>
        }
      />
      <Route
        path='/attendance/profile/:id'
        element={
          <Suspense fallback={<Loading />}>
            <NavigationGuard>
              <AttendanceRenewProfile />
            </NavigationGuard>
          </Suspense>
        }
      />
      <Route path='/success' element={<SuccessPage />} />
      <Route path='/fail' element={<FailPage />} />
    </>
  )
);
