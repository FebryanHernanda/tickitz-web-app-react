import { useState } from "react";
import { AccountSettings, OrderHistory } from "../../organisms";

import avaProfile from "/src/assets/background/ava-profile.png";
import ellips1 from "/src/assets/icons/ornament/ellips1.svg";
import ellips2 from "/src/assets/icons/ornament/ellips2.svg";
import star from "/src/assets/icons/ornament/star.svg";

const ProfilePages = () => {
  const [page, setPage] = useState("settings");

  return (
    <>
      <div className="bg-gray-200">
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-10 p-5 lg:p-10 xl:flex-row">
          {/* <!-- Card section --> */}
          <aside className="max-[1025px]:w-full">
            {/* <!-- Profile Card --> */}
            <div className="h-full w-[400px] rounded-[24px] bg-white max-[1025px]:w-full">
              {/* <!-- Profile COntent --> */}
              <div className="flex w-full flex-col justify-between gap-[50px] p-[30px]">
                <div className="flex items-center justify-between gap-[20px]">
                  <h3 className="font-regular">INFO</h3>
                </div>

                {/* <!-- Profile Hero --> */}
                <div className="flex flex-col items-center gap-5">
                  <div className="h-20 w-20 overflow-hidden rounded-full bg-orange-500">
                    <img
                      src={avaProfile}
                      alt="Photo Profile Avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-[5px] text-center">
                    <h2 className="text-xl font-bold">Jonas El Rodriguez</h2>
                    <h4 className="text-lg">Moviegoers</h4>
                  </div>
                </div>
                {/* <!-- profile Hero --> */}

                <hr />

                {/* <!-- Profile Loyalty Seciton --> */}
                <div className="flex flex-col gap-[30px] max-[1025px]:w-full">
                  <h3 className="font-regular">Loyalty Points</h3>

                  {/* <!-- Card --> */}
                  <div className="relative flex w-full flex-col items-center self-center max-[1025px]:w-[400px] max-[640px]:w-full">
                    <div className="relative z-1 flex w-full flex-col gap-[50px] overflow-hidden rounded-[24px] bg-[#1d4ed8] px-[20px] py-[40px]">
                      <div className="ornament absolute max-[1025px]:left-[70px] max-[769px]:left-[70px] max-[500px]:left-[30px] max-[380px]:left-[-20px] max-[350px]:left-[-70px]">
                        <img
                          src={ellips1}
                          alt="Ellips 1 icon"
                          className="relative top-[-50px] right-[-210px]"
                        />
                        <img
                          src={ellips2}
                          alt="Ellips 2 Icon"
                          className="relative top-[-120px] right-[-240px]"
                        />
                        <img
                          src={star}
                          alt="Star Icon"
                          className="relative top-[-200px] right-[-250px] w-[50px]"
                        />
                      </div>
                      <h1 className="font-regular text-white">Moviegoers</h1>
                      <div className="loyalty-points flex items-end gap-[5px]">
                        <h3 className="text-large font-regular text-white">
                          320
                        </h3>
                        <h4 className="font-regular text-white">points</h4>
                      </div>
                    </div>
                    <div className="card-shadow absolute bottom-[-8px] h-[50px] w-[300px] rounded-[24px] bg-[#1d4ed880] max-[450px]:w-[270px] max-[350px]:w-[220px]"></div>
                  </div>
                  {/* <!-- Card --> */}

                  {/* Card points */}
                  <div className="loyalty-slider !mt-[20px] flex flex-col gap-[20px]">
                    <h3 className="font-regular text-center">
                      180 points become a master
                    </h3>
                    <div className="card-slider h-[20px] w-full rounded-[8px] bg-[#f5f6f8] shadow-[inset_0_4px_10px_rgba(0,0,0,0.2)]">
                      <div className="h-[20px] w-[50%] rounded-[8px] bg-blue-700"></div>
                    </div>
                  </div>
                  {/* Card points */}
                </div>
                {/* <!-- Profile Loyalty Section --> */}
              </div>
              {/* <!-- Profile Content --> */}
            </div>
            {/* <!-- Profile Section --> */}
          </aside>
          {/* <!-- Card Section --> */}

          {/* Profile Settings */}
          <section className="account-dashboard-section flex w-full flex-col gap-[40px]">
            <nav className="flex gap-[50px] rounded-[24px] bg-white px-[30px]">
              <button
                className={`text-medium border-b-[2px] py-[20px] font-light !text-black ${page === "settings" ? "border-blue-700" : "border-none"}`}
                onClick={() => setPage("settings")}
              >
                Account Settings
              </button>
              <button
                className={`text-medium border-b-[2px] py-[20px] font-light !text-black ${page === "history" ? "border-blue-700" : "border-none"}`}
                onClick={() => setPage("history")}
              >
                Order History
              </button>
            </nav>
            {/* Check Navigation, and render component base on navigation value */}
            {page === "settings" ? <AccountSettings /> : <OrderHistory />}
          </section>
          {/* Profile Settings */}
        </div>
      </div>
    </>
  );
};

export default ProfilePages;
