export const CompanyInfoList = (props) => {
  const lists = ['住所', '電話番号', '資本金', '社員数', '設立日'];
  const types = ['address', 'tel', 'capital', 'text', 'date'];
  const infos = {
    住所: props.companyInfo.company_address,
    電話番号: props.companyInfo.phone_number,
    資本金: props.companyInfo.capital_stock,
    社員数: props.companyInfo.employees,
    設立日: props.companyInfo.establishment_date,
  };
  // console.log('1');
  return (
    <>
      {lists.map((list, i) => (
        <div className="mb-4" key={[i]}>
          <div className="text-center">
            <label className="block mb-2 text-sm　 font-bold text-gray-700">
              {lists[i]}
            </label>
            <div
              className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type={types[i]}
            >
              {/* {console.log(infos[list])} */}
              {/* {console.log('infos[i]')} */}
              {infos[list]}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
