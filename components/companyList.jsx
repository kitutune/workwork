import Image from 'next/image';
import Link from 'next/link';
import companyIcon from 'public/company.png';
import { useCallback } from 'react';
import { Addcompany } from './addCompany';

export const CompanyList = (props) => {
  const searchCompany = useCallback(
    props.allData.filter((company) => {
      let searchContent =
        company['company_name'] +
        ' ' +
        company['URL'] +
        ' ' +
        company['access'] +
        ' ' +
        company['capital_stock'] +
        ' ' +
        company['company_address'] +
        ' ' +
        company['work'];
      return searchContent
        .toLowerCase()
        .includes(props.filterText.toLowerCase());
    }),
    [props]
  );
  // console.log('CompanyList');

  if (searchCompany.length !== undefined) {
    return (
      <div className="grid grid-cols-3 gap-2 m-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
        <Addcompany
          user_id={props.user_id}
          getCompanyList={props.getCompanyList}
        />
        {searchCompany.map((company) => {
          return (
            <Link
              key={company.company_id}
              href={`/companyInfo?id=${company.company_id}`}
              // as={`/companyInfo?id=${company.company_name}`}
              passHref
              userId={props.user_id}
            >
              <div className="p-2 border cursor-pointer">
                <div className="flex justify-center">
                  {company.URL ? (
                    <Image
                      src={`http://capture.heartrails.com/200x200/cool/delay=10?${company.URL}`}
                      width={200}
                      height={200}
                      alt="CompanyThumbnail"
                    />
                  ) : (
                    <Image
                      src={companyIcon}
                      alt="NoThumbnail"
                      width={200}
                      height={200}
                    />
                  )}
                </div>
                <div className="mt-2 text-center">
                  {company['company_name']}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }

  return <div>{props.children}</div>;
};
