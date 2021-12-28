import React, { useEffect, useState } from "react";
import { Box, Container, Fab ,Dialog , AppBar,Toolbar,Typography,} from "@mui/material";
import axios from "axios";
import AppMenu from "../component/AppMenu";
import ForumCard from "../component/ForumCard";
import ForumAddCard from "../component/ForumAddCard";
import AddIcon from "@mui/icons-material/Add";
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";

export default function ForumIndex() {

  const [article, setArticle] = useState([]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (refresh=false) => {
    setOpen(false);
    if(refresh){
      fetchData()
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
      try {
        const result = await axios.get("/Gossip/1");// 先把使用者寫死
        setArticle(result.data);
      } catch (e) {
        alert("get failed，使用前端預設值");
        setArticle([
          {
            gossip_id: 1,
            title: "ETF 投資心法",
            content: "台積電今年10月拍板赴日設立12吋晶圓廠，近期密集核算在日本的建廠成本，發現在日方全力協助下，建廠成本已幾乎和台灣相近，讓台積電對赴日本興建晶圓廠，一改先前認定成本高等不利的態度，台積電內部可能調整在日本設廠戰略布局，不排除也另在日本設立先進製程晶圓廠。",
            date: "2021-12-07",
            user_id: 1,
            category: "理財",
            author: "Andy",
            total: 1,
            islike: 0,
            iscollect: 1
            },
            {
            gossip_id: 2,
            title: "台積電股票",
            content: "台積電近日股市連續上漲",
            date: "2021-12-06",
            user_id: 2,
            category: "理財",
            author: "Mavis",
            total: 1,
            islike: 1,
            iscollect: 0
            },
        ]);
      }
    }
  return (
    <Box>
      <AppMenu />
      <Container maxWidth="sm">
        <img src="./assets/banner.png" alt="banner" style={{maxWidth: '100%'}}></img>
        {article.map((data, index) => {
          return <ForumCard key={index} title={data}></ForumCard>;
        })}

      </Container>

      <Fab
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
        sx={{
          position: "fixed",
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2),
        }}
      >
        <AddIcon  />
      </Fab>
      <Fab
        component={Link}
        to="./Collect"
        color="secondary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: (theme) => theme.spacing(2),
          left: (theme) => theme.spacing(2),
        }}
      >
        <TurnedInIcon  />
      </Fab>
      <Fab
        color="lightblue"
        component={Link}
        to="./Personal"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: (theme) => theme.spacing(2),
          left: (theme) => theme.spacing(10),
        }}
      >
        <PersonIcon  />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              發表你的想法吧....
            </Typography>
            
          </Toolbar>
        </AppBar>
        <ForumAddCard open={open} onClose={handleClose}></ForumAddCard>
      </Dialog>
    </Box>
  );
}