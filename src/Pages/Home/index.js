import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Context/DataContext";
import { api } from "../../Service/Api";
import { useNavigate } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import MuiInput from '@mui/material/Input';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";
import logo from "../../Assets/LogoNeki.png"

const Input = styled(MuiInput)`
        width: 42px;`;

export const Home = () => {
    const { armazenaDadosUsuario } = useContext(DataContext);
    const { dadosUsuario } = useContext(DataContext)
    const [userSkills, setUserSkills] = useState();
    const [allSkills, setAllSkills] = useState();
    const [logado, setLogado] = useState();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedSkill, setSelectedSkill] = useState();
    const [level, setLevel] = useState();
    const [value, setValue] = React.useState();
    const [trueOrFalse, setTrueOrFalse] = useState(false);
    const Navigation = useNavigate();

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 10) {
            setValue(10);
        }
    };

    const handleChange = (event) => {
        setSelectedSkill(event.target.value);
    };

    const handleLevel = (event) => {
        setLevel(event.target.value);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#eee',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleAllSkills = async () => {
        api.get(`/skill`,
            { headers: { "Authorization": `Bearer ${dadosUsuario?.token}` } }
        ).then((res) => {
            setAllSkills(res.data)
            console.log("RESPOSTA DO DATA: " + JSON.stringify(res.data))
        }).catch((error) => {
            console.log("Erro ao realizar requisição das skills: " + JSON.stringify(error))
        })
    }

    const handleSkills = async () => {
        api.get(`/user/${dadosUsuario.userId}`,
            { headers: { "Authorization": `Bearer ${dadosUsuario?.token}` } }
        ).then((res) => {
            setUserSkills(res.data.user_skills)
            setLogado(res.data)
            console.log("RESPOSTAAAAAA: " + JSON.stringify(res.data.user_skills))
        }).catch((error) => {
            console.log("Erro ao realizar requisição das skills: " + JSON.stringify(error))
        })
    }

    const handleSaveUserSkill = async () => {
        FunctioTrueOrFalse();
        try {
            await api.post('/user_skill',
                {
                    user: {
                        userId: dadosUsuario.userId
                    },
                    skill: {
                        skillId: selectedSkill
                    },
                    knowledgeLevel: level,
                },
                { headers: { "Authorization": `Bearer ${dadosUsuario?.token}` } })
        } catch (error) {
            console.log("Erro ao salvar a skill para este usuário!")
        }
    }

    const DeleteSkill = async (id) => {
        FunctioTrueOrFalse();
        api.delete(`/user_skill/${id}`, {
            headers: { "Authorization": `Bearer ${dadosUsuario?.token}` }

        }).then((resp) => {
            console.log("DELETADO COM SUCESSO DO BANCO" + id);

        }).catch((error) => {
            console.log("Erro no DELETE  " + JSON.stringify(error));
        })
    }

    const handleUpdateLevel = async (idUserSkill, idSkill) => {
        try {
            await api.put(
                `/user_skill/${idUserSkill}`,
                {
                    user: {
                        userId: dadosUsuario.userId
                    },
                    skill: {
                        skillId: idSkill
                    },
                    knowledgeLevel: value,
                },
                { headers: { Authorization: `Bearer ${dadosUsuario?.token}` } },
                console.log("USER ID: " + dadosUsuario.userId + "SKILL ID: " + selectedSkill + "LEVEL: " + value),
            ).then((resp) => {
                console.log("O seu nível foi alterado com sucesso.");
            });
        } catch (error) {
            console.log("Algo deu errado, tente novamente.");
        }
    };

    const Logout = () => {
        localStorage.removeItem("key_Login")
        Navigation("/")
    }

    const FunctioTrueOrFalse = () => {
        if (trueOrFalse == true) {
            setTrueOrFalse(false)
        } else {
            setTrueOrFalse(true)
        }
    }

    useEffect(() => {
        armazenaDadosUsuario(localStorage.getItem("key_Login"));
        console.log('VALOR DO LOCALSTORAGE NA HOME: ' + localStorage.getItem("key_Login"));

    }, [trueOrFalse])

    useEffect(() => {
        handleSkills();
        handleAllSkills();
    }, [dadosUsuario])


    return (
        <>
            <header>
                <div className="info">
                    <img src={logo} className="logo" />
                </div>
                <div className="info">
                    <h2>Página de skills</h2>
                </div>
                <div className="info">
                    <div className="icons">
                        <IconButton edge="end" onClick={handleOpen} >
                            <AddCircleOutlineIcon sx={{ fontSize: 40, color: '#eee' }} />
                        </IconButton>
                    </div>
                    <div className="icons">
                        <IconButton edge="end" onClick={Logout} >
                            <LogoutIcon sx={{ fontSize: 40, color: '#eee' }} />
                        </IconButton>
                    </div>
                </div>
            </header>
            <body>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">Skill</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedSkill}
                                label="skill"
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                {allSkills?.map((resSkills) => (
                                    <MenuItem value={resSkills.skillId}>
                                        {resSkills.skillName}
                                    </MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ marginTop: 5 }}>
                            <InputLabel id="demo-simple-select-label">Level</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedSkill}
                                label="level"
                                onChange={handleLevel}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value={1}>Um</MenuItem>
                                <MenuItem value={2}>Dois</MenuItem>
                                <MenuItem value={3}>Três</MenuItem>
                                <MenuItem value={4}>Quatro</MenuItem>
                                <MenuItem value={5}>Cinco</MenuItem>
                                <MenuItem value={6}>Seis</MenuItem>
                                <MenuItem value={7}>Sete</MenuItem>
                                <MenuItem value={8}>Oito</MenuItem>
                                <MenuItem value={9}>Nove</MenuItem>
                                <MenuItem value={10}>Dez</MenuItem>
                            </Select>
                        </FormControl>
                        <div className="button">
                            <span onClick={() => { handleSaveUserSkill() }}>Adicionar skill</span>
                        </div>
                    </Box>
                </Modal>
                <div className="containerSkills">
                    <div className="containerList">
                        {userSkills?.map((skills) => (

                            <List sx={{ width: '100%', maxWidth: 600, backgroundColor: '#222' }}>
                                <ListItem sx={{ marginBottom: 0, backgroundColor: '#ccc', borderRadius: 5 }}>
                                    <ListItemAvatar>
                                        <Avatar sx={{ height: 100, width: 100 }} src={skills.skill.skillImage} />
                                    </ListItemAvatar>
                                    <ListItemText sx={{ margin: 5, marginRight: 20 }} primary={skills.skill.skillName} secondary={skills.skill.skillVersion} />

                                    <Typography id="input-slider" gutterBottom sx={{ marginRight: 2 }}>
                                        Nível
                                    </Typography>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Input
                                                defaultValue={skills.knowledgeLevel}
                                                size="small"
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                inputProps={{
                                                    step: 1,
                                                    min: 0,
                                                    max: 10,
                                                    type: 'number',
                                                    'aria-labelledby': 'input-slider',
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <IconButton edge="end" onClick={() => { handleUpdateLevel(skills.userSkillId, skills.skill.skillId) }} >
                                        <UpdateIcon sx={{ fontSize: 35, color: '#111' }} />
                                    </IconButton>
                                    <IconButton edge="end" onClick={() => { DeleteSkill(skills.userSkillId) }} >
                                        <DeleteForeverIcon sx={{ fontSize: 35, color: '#111' }} />
                                    </IconButton>
                                </ListItem>
                            </List>

                        ))
                        }
                    </div>
                </div>
            </body>
        </>
    )
}
