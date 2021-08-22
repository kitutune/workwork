import { Footer } from './footer';
import { Header } from './header';
export const LayoutWrapper = (props) => {
  return (
    <div className="bg-gray-600">
      <div className="container mx-auto grid grid-rows-[auto,1fr,auto] min-h-screen">
        <Header />
        <main className="px-4 text-gray-600 bg-gray-100">
          <div>{props.children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
