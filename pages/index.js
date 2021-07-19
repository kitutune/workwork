import { supabase } from 'utils/supabaseClient';
import { Auth, Button } from '@supabase/ui';
import { Profile } from 'components/Profile';

export default function IndexPage() {
  const { user } = Auth.useUser();
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log('Error logging out:', error.message);
  };

  return (
    <div className="w-full h-full bg-gray-300  ">
      {!user ? (
        <div className="w-full h-full flex justify-center items-center p-4">
          <Auth
            supabaseClient={supabase}
            providers={['google', 'github']}
            socialLayout="horizontal"
            socialButtonSize="xlarge"
          />
        </div>
      ) : (
        <div
          className="w-full h-full flex flex-col justify-center items-center p-4"
          style={{ minWidth: 250, maxWidth: 600, margin: 'auto' }}
        >
          <Profile logout={logout} uuid={user.id} />
          <Button className="btn-black w-full mt-12" onClick={logout}>
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}
