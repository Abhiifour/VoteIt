import React from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/card';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../Atom';

const Profile = () => {
    const user = useRecoilValue(userState)
  return (
    <div className="min-h-screen bg-zinc-950 p-8 h-screen">
      <div className="max-w-3xl mx-auto">
        <Card className="bg-zinc-900/95 border-zinc-800 shadow-xl h-[600px]">
          <CardHeader className="">
            {/* Cover Image */}
           
            {/* Profile Avatar */}
            <div className=" bottom-0 left-6 transform translate-y-1/2 flex justify-center">
              <div className='w-[80px] h-[80px] rounded-full overflow-hidden'>
              <img
                    src={user.img}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
              </div>
            </div>

            {/* Edit Profile Button */}
           
          </CardHeader>

          <CardContent className="pt-8 space-y-6">
            {/* Basic Info */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-zinc-100">{user.name}</h1>
              
            </div>

          
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;