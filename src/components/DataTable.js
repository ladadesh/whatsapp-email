import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';
import Button from '@mui/material/Button';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Rating from '@mui/material/Rating';



export default function DataTable({finalData,setFinalData}) {

    const updateData = (row) => {
        for (let index = 0; index < finalData.length; index++) {
            if(finalData[index].id === row.id){
                finalData[index].isSent = true;
                break;
            }
        } 
        setFinalData([...finalData]);
    }

    const renderButton = (props) => {

        const handleWhatsAppClick = () =>{
            updateData(props.row);
            console.log("props",props);
            let url = `https://web.whatsapp.com/send?phone=${props.row.phone}`;
    
            // Appending the message to the URL by encoding it
            url += `&text=${encodeURI("Hey")}&app_absent=0`;
            window.open(url);
        }
    
        const handleEmailClick = () =>{
            updateData(props.row);
            window.location = 'mailto:blackflysolution.@gmail.com'
            console.log("props",props);
        }
    
        return (
          <strong>
            <Button
              component="button"
              color='success'
              disabled={!props.row.phone}
              onClick={()=>handleWhatsAppClick()}
            >
              <WhatsAppIcon />
            </Button>
            <Button
              component="button"
              disabled={!props.row.email}
              onClick={() => handleEmailClick()}
            >
              <MailOutlineIcon />
            </Button>
          </strong>
        );
    }
    
    function renderRating(props){
        return(
            <strong>
                <Rating ame="read-only" value={props.row.ratings ? props.row.ratings : 0} readOnly  />
            </strong>
        )
    }
    
    function renderSent(props){
        return(
            <strong>
                {props.row.isSent ? `✅` : `❌` }
            </strong>
        )
    }

    const columns = [
        { field: 'id', headerName: 'Sr No' },
        { field: 'business_name', headerName: 'Business Name', width: 600 },
        { field : 'ratings' , headerName : 'Ratings' , width : 300 , renderCell : renderRating },
        { field: 'phone', headerName: 'Send Message', width: 300  , renderCell : renderButton},
        {field : 'isSent' , headerName : 'Sent' , renderCell : renderSent}
    ]

  return (
      <div style={{ height: 700, width: '100%' , marginTop : "20px" }}>
        <DataGrid 
            rows={finalData}
            columns={columns}
            // pageSize={12} 
            disableRowSelectionOnClick
        />
      </div>
  );
}
