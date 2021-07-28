import Image from 'next/image';
import Link from 'next/link';
import companyIcon from 'public/company.png';
// import React from 'react';
import { Addcompany } from '../components/addCompany';
// import { AddTitle } from "src/components/addTitle";

// export type Title = {
//   id: number;
//   user_id: string;
//   company: string;
//   author: string;
//   image_url: string;
// };

// type TitlesProps = {
//   companys: Title[];
//   uuid: string;
//   getCompanyList: VoidFunction;
//   filterText: string;
// };

export const CompanyList = (props) => {
  const filteredTitle = props.companyNames.filter((company) => {
    let searchContent = company['会社名'] + ' ' + company.URL;
    return searchContent.toLowerCase().includes(props.filterText.toLowerCase());
  });
  console.log(props.uuid);
  console.log('companyListのuuid');
  return (
    <div className="grid grid-cols-3 gap-2 m-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
      <Addcompany uuid={props.uuid} getCompanyList={props.getCompanyList} />
      {filteredTitle.map((company) => {
        return (
          <Link
            key={company.id}
            href={`/companyInfo?id=${company.id}`}
            passHref
          >
            <div className="p-2 border cursor-pointer">
              <div className="flex justify-center">
                <Image
                  src={companyIcon}
                  alt="thumbnail"
                  width={126}
                  height={200}
                />
              </div>
              <div className="mt-2 text-center">{company['会社名']}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
