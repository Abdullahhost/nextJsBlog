

import SideBar from "@/app/components/header/sidebar";
import Topbar from "@/app/components/header/topbar";

import Categories from "@/app/components/categories/page";
import BlogList from "../../components/BlogList";
import { getCategoriesData } from "@/app/libs/getData";
import Link from "next/link";
import { MotionDiv } from "../../components/MotionDiv";

export default async function Home({ params, searchParams }: { params: { role: string }, searchParams: any }) {


    const perPage: number = 4;

    let page = parseInt(searchParams.page, 10);
    !page || page < 1 ? 1 : page;

    const itemData = await getCategoriesData(perPage, page, params?.role);

    const itemCount = itemData?.countBlog;
    const allBlog = itemData?.items;

    const totalPage = Math.ceil(itemCount! / perPage);

    const prevPage = page - 1 > 0 ? page - 1 : 1;
    const nextPage = page + 1;


    const pageNumber: number[] = [];

    
  const maxPagesToShow = 5;
    let startPage: number, endPage: number;

    if (totalPage <= maxPagesToShow) {
      // Show all pages
      startPage = 1;
      endPage = totalPage;
    } else {
      // Determine a sliding window
      const middle = Math.ceil(maxPagesToShow / 2);
      if (page <= middle) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (page + middle > totalPage) {
        startPage = totalPage - maxPagesToShow + 1;
        endPage = totalPage;
      } else {
        startPage = page - (middle - 1);
        endPage = page + (middle - 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumber.push(i);
    }


      const filteredData:any[] = allBlog?.filter((item: any) => item?.title.toLowerCase().includes(searchParams?.query)) || []



        const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };


    return (
        <main className="flex items-start justify-start w-full">
            <SideBar />
            <div className="flex flex-col w-full ml-0 lg:ml-[220px]">
                <Topbar />
                <h2 className="text-2xl font-semibold text-center md:text-start transition text-[#4d4b4d] pt-4 dark:text-white px-6">
                    {params ? params?.role : "Blog Page"}
                </h2>
                        <div className="w-full flex flex-col-reverse lg:flex-row gap-2 items-start justify-center lg:justify-between" >

          <MotionDiv

            variants={container}
            initial="hidden"
            animate="visible"
            style={{ placeSelf: "start" }}
            className=" w-full xl:w-[65%] container px-3 md:px-4 py-3 grid mx-auto xl:mx-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 lg:gap-6 ">

            {itemCount! > 0 ? (
              <>
                {searchParams?.query ? (

                  <BlogList data={filteredData} />
                ) : (

                  <BlogList data={allBlog} />
                )}

              </>
            ) : (
              <div>
                <h1>There Are No Available Data here!</h1>
              </div>
            )
            }
          </MotionDiv>
          <div className="w-full lg:w-fit mr-6">
            <Categories />
          </div>
        </div>


        {searchParams?.query ? (
          ""
        ) : <div className="px-4 md:px-6 py-3 flex gap-2 md:gap-4 w-full items-center mt-10 overflow-auto">
              <div>

              {!searchParams.page || page === 1 ? (
                <>
                  <div aria-disabled={true}></div>
                </>
              ) : (
                <>
      
                  <Link aria-label="Previous Page" className="
                  hover:bg-[#2B2A6D] border dark:border-neutral-600 shadow-md dark:shadow-neutral-500
                  hover:text-white hover:dark:bg-[#399B19] text-sm px-2 md:px-4 py-1 lg:py-2 rounded-2xl
                  dark:bg-[#3D3D3D] transition hidden md:block"
                  href={`?page=${prevPage}`}>
                      Previous
                  </Link>
                  <Link aria-label="Previous Page" className="
                  hover:bg-[#2B2A6D] border dark:border-neutral-600 shadow-md dark:shadow-neutral-500
                  hover:text-white hover:dark:bg-[#399B19] text-sm px-2 md:px-4 py-1 lg:py-2 rounded-2xl
                  dark:bg-[#3D3D3D] transition block md:hidden"
                  href={`?page=${prevPage}`}>
                    ⇠ 
                  </Link>

              
           
                </>
              )}
            </div>
            <div>
             {
             pageNumber[0] > 1 && <span className="text-gray-500 flex items-center px-1">...</span>
            }
            </div>
            <div >
              {
                pageNumber?.map((singleNumber, index) => (

                  <Link className={`hover:bg-[#2B2A6D] hover:text-white shadow-md
                 dark:shadow-neutral-500  hover:dark:bg-[#399B19] px-2 md:px-4 text-sm 
                 py-1 md:py-2 rounded-lg mx-1 lg:mx-2 transition border dark:border-neutral-600
                 ${page === singleNumber ? "bg-[#2B2A6D] text-white  dark:bg-[#399B19]" : ''} ${!page && singleNumber === 1 ? "bg-[#2B2A6D] text-white  dark:bg-[#399B19]" : ""}  `} key={index} href={`?page=${singleNumber}`}>
                    {singleNumber}
                  </Link>
                ))
              }
            </div>
            <div>
              
           {
              pageNumber[pageNumber.length - 1] < totalPage && <span className="text-gray-500 flex items-center px-1">...</span>
            }

            </div>
            <div>
              {page > totalPage - 1 ? (
                <>
                  <div aria-disabled={true}></div>
                </>
              ) : (
                <>
                  {itemCount! > 4 && (

                    <>

                    <Link arai-label="Next Page" className="hover:bg-[#2B2A6D] dark:border-neutral-600 shadow-md dark:shadow-neutral-500  hover:text-white hover:dark:bg-[#399B19] text-sm px-2 lg:px-4 py-1 lg:py-2 rounded-2xl border dark:bg-[#3D3D3D]  transition hidden md:block" href={`${!page ? `?page=${2}` : `?page=${nextPage}`}`}>
                      Next
                    </Link>
                    <Link arai-label="Next Page" className="hover:bg-[#2B2A6D] dark:border-neutral-600 shadow-md dark:shadow-neutral-500  hover:text-white hover:dark:bg-[#399B19] text-sm px-2 lg:px-4 py-1 lg:py-2 rounded-2xl border dark:bg-[#3D3D3D]  transition block md:hidden" href={`${!page ? `?page=${2}` : `?page=${nextPage}`}`}>
                   ⇢
                    </Link>

                    </>
                
                  )}

                </>
              )}
            </div>
          </div>
          }
            </div>
        </main>
    );
}
