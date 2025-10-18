
import Image from "next/image";

import SideBar from "@/app/components/header/sidebar";
import Categories from "@/app/components/categories/page";

import { BsCalendar3 } from "react-icons/bs";
import { timeCalculating } from "@/app/libs/timeCalculate";
import { BlogInterface } from "../create/page";
import { getSingleBlog } from "@/app/hooks/getAllBlog";
import { DateFormat } from "@/app/libs/dateFormat";
import ToggleBtn from "@/app/components/Button/ToggleBtn";

const page = async ({ params }: { params: { id: string } }) => {

  const { data } = await getSingleBlog(params?.id);

  return (
    <div className="flex items-start justify-start w-full my-4">
      <div className="">
        <div className="block lg:hidden pl-6 fixed top-4 left-0 ">
          <ToggleBtn />
        </div>
      <SideBar />
      </div>
      <div className="flex flex-col w-full ml-0 lg:ml-[220px]">
        <div className="px-6 flex items-start gap-6 mt-10 flex-wrap lg:flex-nowrap">
          <div className="w-full">
            {data!?.length > 0 ? <>

              {data!?.map((ele: BlogInterface) => {
                return <div key={ele?.title}>
                  <div className="w-full flex gap-5">


                  <h2 className="font-bold leading-[2rem] text-xl text-start mb-6 dark:text-[#eeeeee] border-slate-200 border-b py-1 uppercase inline-block text-slate-500 dark:border-slate-500">
                    {ele?.title}

                  </h2>
                  <span className=" ml-5 h-fit font-bold text-center md:text-start p-2 mb-4 dark:text-white border-b-[#5555552f] dark:border-b-[#399B19] border-b-2">{ele.role}</span>
                  </div>
                  <Image
                    className="w-full rounded-lg"
                    src={ele?.image}
                    alt={`${ele?.role} Image`}
                    width={1000}
                    height={400}
                  />
                  <div className="flex items-center gap-3 justify-start my-2 text-xs">
                    <div className="flex gap-2 items-center">
                      <BsCalendar3 />
                      <span>

                        {DateFormat(ele?.createdAt)}
                      </span>
                    </div>
                    <div>
                      <span className="whitespace-nowrap">{timeCalculating(ele?.createdAt)}</span>
                    </div>
                  </div>

                  <br />
                  <p className="text-sm dark:text-[#d6d7d8] whitespace-pre-line">{ele?.description}</p>
                </div>
              })}
            </> : <>
              <h2>There is Nothing To Show</h2>
            </>}
          </div>
          <div className="md:max-w-[300px]">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
