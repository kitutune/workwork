/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '@supabase/ui';
import { supabase } from 'utils/supabaseClient';
import { useRouter } from 'next/router';

// eslint-disable-next-line react/display-name
export const EditCompany = React.memo((props) => {
  const info = props.companyInfo;
  const subInfos = props.companySubInfo;
  const items = [
    '名前',
    '住所',
    '電話番号',
    '資本金',
    '社員数',
    '設立日',
    '最寄駅',
    'アクセス',
    'WORK',
    '駐輪場',
    'バイク置き場',
    '駐車場',
    '備考欄',
    'webUrl',
    'jobUrl',
  ];
  const types = {
    名前: 'text',
    住所: 'address',
    電話番号: 'tel',
    資本金: 'capital',
    社員数: 'text',
    設立日: 'date',
    最寄駅: 'station',
    アクセス: 'accses',
    WORK: 'text',
    駐輪場: 'text',
    バイク置き場: 'text',
    駐車場: 'text',
    備考欄: 'text',
    webUrl: 'text',
    jobUrl: 'text',
  };

  const companyId = props.id;
  const router = useRouter();
  const Container = () => {
    const [form, setForm] = useState({
      company_name: '',
      company_address: '',
      phone_number: '',
      capital_stock: '',
      employees: '',
      establishment_date: '',
      nearest_station: '',
      access: '',
      work: '',
      parking: '',
      motorcycle_parking: '',
      parking_area_for_bicycles: '',
      remarks: '',
      URL: '',
      job_url: '',
    });
    const lists = [
      'company_name',
      'company_address',
      'phone_number',
      'capital_stock',
      'employees',
      'establishment_date',
      'nearest_station',
      'access',
      'work',
      'parking',
      'motorcycle_parking',
      'parking_area_for_bicycles',
      'remarks',
      'URL',
      'job_url',
    ];

    const handleChange = (input) => (e) => {
      setForm({ ...form, [input]: e.target.value });
    };

    const companyInfoEditButton = async () => {
      const { data, error, status } = await supabase
        .from('company')
        .update({
          company_id: companyId,
          company_name: form.company_name,
          phone_number: form.phone_number,
          company_address: form.company_address,
          capital_stock: form.capital_stock,
          employees: form.employees,
          establishment_date: form.establishment_date,
          URL: form.URL,
          job_url: form.job_url,
        })
        .eq('company_id', companyId);
      if (!data || error || status !== 200) {
        alert('データの更新に失敗しました！');
      }
    };

    const companyInfoSubEditButton = useCallback(async () => {
      // console.log(form);
      // console.log('companySubButton');
      const { data, error, status } = await supabase
        .from('company_info')
        .update({
          company_id: companyId,
          nearest_station: form.nearest_station,
          access: form.access,
          work: form.work,
          parking: form.parking,
          motorcycle_parking: form.motorcycle_parking,
          parking_area_for_bicycles: form.parking_area_for_bicycles,
          remarks: form.remarks,
          update_info: subInfos.update_info,
        })
        .eq('company_id', companyId);
      if (!data || error || status !== 200) {
        alert('データの更新に失敗しました！');
      } else {
        alert('データを更新しました！');
        router.reload();
      }
    }, [form]);

    const editButton = useCallback(
      (form) => {
        companyInfoEditButton(form);
        companyInfoSubEditButton(form);
      },
      [form]
    );

    const deleteButton = async () => {
      await supabase.from('company_info').delete().eq('company_id', companyId);
      await supabase.from('company').delete().eq('company_id', companyId);
      await supabase
        .from('company_comment')
        .delete()
        .eq('company_id', companyId);
      await supabase.from('flug').delete().eq('company_id', companyId);
      router.push('/');
    };
    const getData = async () => {
      const { data, error } = await supabase
        .from('company_info_flug')
        .select(lists.join(','))
        .eq('company_id', info.company_id)
        .single();
      if (error) {
        alert('dataの読み込みに失敗しました！');
      } else {
        console.log(data);
        console.log('読み込み成功');
        return setForm(data);
      }
    };
    useEffect(() => {
      if (info) getData();
    }, [info]);
    useEffect(() => {
      // eslint-disable-next-line no-unused-vars
      let unmounted = false;
      // clean up関数（Unmount時の処理）
      return () => {
        // console.log('アンマウント');
        unmounted = true;
      };
    }, []);
    console.log('editCompany');
    return (
      <div className="translate-y-1/4">
        <div className="h-screen flex justify-center items-center ">
          <div className="p-5 bg-gray-400 w-3/4 rounded-lg">
            <form className="p-3 flex flex-col space-y-5">
              {Object.entries(form).map(([key, value], i) => (
                <div key={key} className="contents">
                  <p>{items[i]}</p>
                  <input
                    type={types[i]}
                    placeholder={value}
                    onChange={handleChange(key)}
                    className="p-2 w-3/4bg-gray-100"
                  />
                </div>
              ))}
            </form>
            <div className="flex items-center justify-evenly mb-5">
              <Button onClick={editButton}>
                <div className="py-4 px-8 text-lg rounded ">変更</div>
              </Button>
              <Button onClick={deleteButton}>
                <div className="py-4 px-8 text-lg rounded ">削除</div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {companyId && router ? (
        <div>
          <Container companyId={companyId} router={router} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
});
