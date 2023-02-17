import AdminLayout from '../../components/Layout/AdminLayout';
import type { NextPageWithLayout } from '../../@types';
import UploadImageForm from '../../components/Form/UploadImageForm';

const GalleryPage: NextPageWithLayout = () => {
  return (
    <>
      <UploadImageForm />
    </>
  );
};

GalleryPage.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default GalleryPage;
