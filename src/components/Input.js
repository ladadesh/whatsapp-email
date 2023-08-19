import * as React from 'react';
import Button from '@mui/joy/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import { styled } from '@mui/joy';
import * as XLSX from "xlsx";


const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function InputFileUpload({finalData,setFinalData}) {

    const handleFileUpload = (e) => {
        let file = e.target.files[0];
        console.log(file);
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (event) => {

            const bufferArray = event.target.result;

            const wb = XLSX.read(bufferArray, { type: 'buffer' }); //to read excel file after converting into js readble format 
            const mainTabName = wb.SheetNames[0];//selecting the first tab of the excel            
            
            const mainTabExcel = wb.Sheets[mainTabName];//selecting the data from the selected tab of the excel
            let mainTabData = XLSX.utils.sheet_to_json(mainTabExcel);//convertint the data into 
            mainTabData = mainTabData.map(item=>{
                let finalItem = {
                    "id" : item["S.No"],
                    "business_name": item["Business Name"] ? item["Business Name"] : false,
                    "address": item["Address"] ? item["Address"] : false,
                    "phone": item["Phone"] ? item["Phone"] : false,
                    "email": item["Email"] ? item["Email"] : false,
                    "website": item["Website"] ? item["Website"] : false,
                    "facebook": item["Facebook"] ? item["Facebook"] : false,
                    "instagram": item["Instagram"] ? item["Instagram"] : false,
                    "youtube": item["Youtube"] ? item["Youtube"] : false,
                    "linkedIn": item["LinkedIn"] ? item["LinkedIn"] : false,
                    "pinterest": item["Pinterest"] ? item["Pinterest"] : false,
                    "ratings": item["Ratings"] ? item["Ratings"] : false,
                    "reviews": item["Reviews"] ? item["Reviews"] : false,
                    "isSent" : false
                }
                return finalItem;
            })
            console.log("data=>",mainTabData)
            setFinalData(mainTabData);
        }
    }

  return (
    <>
    {finalData.length === 0 &&
        <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            variant="outlined"
            color="neutral"
            style={{ margin : '20px 45%' }}
            startDecorator={
                <SvgIcon>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                </svg>
                </SvgIcon>
            }
        >
        Upload a file
        <VisuallyHiddenInput type="file" onChange={(e)=>handleFileUpload(e)} />
        </Button>
        }
    </>
  );
}
