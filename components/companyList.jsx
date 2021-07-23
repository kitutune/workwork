import Image from 'next/image';
import Link from 'next/link';
import companyIcon from 'public/company.png';
// import React from 'react';
import { Addcompany } from '../components/addCompany';
// import { AddTitle } from "src/components/addTitle";

// export type Title = {
//   id: number;
//   user_id: string;
//   title: string;
//   author: string;
//   image_url: string;
// };

// type TitlesProps = {
//   titles: Title[];
//   uuid: string;
//   getCompanyList: VoidFunction;
//   filterText: string;
// };

export const CompanyList = (props) => {
  const filteredTitle = props.companyNames.filter((title) => {
    let searchContent = title['会社名'] + ' ' + title.URL;
    return searchContent.toLowerCase().includes(props.filterText.toLowerCase());
  });

  return (
    <div className="grid grid-cols-3 gap-2 m-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
      <Addcompany uuid={props.uuid} getCompanyList={props.getCompanyList} />
      {filteredTitle.map((title) => {
        return (
          <Link key={title.id} href={`/title?id=${title.id}`} passHref>
            <div className="p-2 border cursor-pointer">
              <div className="flex justify-center">
                {/* {title.image_url ? (
                  <Image
                    src={title.image_url}
                    alt="thumbnail"
                    width={126}
                    height={200}
                  />
                ) : ( */}
                <Image
                  src={companyIcon}
                  alt="thumbnail"
                  width={126}
                  height={200}
                />
                {/* )} */}
              </div>
              <div className="mt-2 text-center">{title['会社名']}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
