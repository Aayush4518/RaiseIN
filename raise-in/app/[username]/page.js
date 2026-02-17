import UploadPhoto from "../components/uploadPhoto";

export default async function Username({ params }) {
  const { username } = await params;

  return (
    <div className="w-full min-h-screen p-6 md:p-10">
      {/* Profile Header */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            {username}'s Profile
          </h1>
          <p className="text-gray-400 text-lg">Manage your profile and upload media</p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Photo Upload Section */}
          <div className="p-8 md:p-10">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Profile Photo</h2>
                <p className="text-gray-400 text-sm">Upload and manage your profile image</p>
              </div>
            </div>
            <UploadPhoto username={username} />
          </div>
        </div>
      </div>
    </div>
  );
}
