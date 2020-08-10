import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import {useHistory} from "react-router-dom"

import "./styles.css"
import Input from '../../components/input/index';

import warningIcon from "../../assets/images/icons/warning.svg"
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';




function TeacherForm() {

    const history = useHistory()

    const [name, setName] = useState("")
    const [avatar, setAvatar] = useState("")
    const [whatsapp, setWhatsapp] = useState("")
    const [bio, setBio] = useState("")

    const [subject, setSubject] = useState("")
    const [cost, setCost] = useState("")

    const [scheduleItems, setscheduleItems] = useState([
        { week_day: 0, from: "", to: "" }
    ])

    function addNewScheduleItem() {
        setscheduleItems([
            ...scheduleItems,
            { week_day: 0, from: "", to: "" }
        ])
    }

    /*A funcao setScheduleItemValue ela vai retorna um novo array porem com a quantidade original, 
    por isso que usamos o MAP, scheduleItem vai ser o conteudo e o INDEX é
     a posicao, depois fazer um SE(if), os 3 pontos ela vai retorna todo o scheduleItem la de cima*/

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updateScheduleItem = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem
        })

        setscheduleItems(updateScheduleItem)
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault()

        api.post("classes",{
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(()=>{
            alert("Cadastro Feito com Sucesso")

            history.push("/")
        }).catch(()=>{
            alert("Erro no cadastro")
        })

        

    }


    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrivel que você quer dar aulas."
                description="O primeiro passo é preencher esse formulario de inscrição"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input
                            name="name"
                            label="Nome completo"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }} />

                        <Input
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => { setAvatar(e.target.value) }}
                        />

                        <Input
                            name="whatsapp"
                            label="Whatsapp"
                            value={whatsapp}
                            onChange={(e) => { setWhatsapp(e.target.value) }}
                        />

                        <Textarea name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(e) => { setBio(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a Aula</legend>

                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
                            options={[
                                { value: "Artes", label: "Artes" },
                                { value: "Geografia", label: "Geografia" },
                                { value: "Ciências", label: "Ciências" },
                                { value: "Matematica", label: "Matematica" },
                                { value: "Biologia", label: "Biologia" },
                                { value: "Física", label: "Física" },
                                { value: "Ciências Economicas", label: "Ciências Economicas" },
                                { value: "Desenvolvimento de Sistmas", label: "Desenvolvimento de Sistmas" },
                            ]}
                        />

                        <Input name="cost"
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(e) => { setCost(e.target.value) }}
                        />


                    </fieldset>

                    <fieldset>
                        <legend>Horários disponíveis
                    <button type="button" onClick={addNewScheduleItem}>
                                + Novo horários
                    </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, "week_day", e.target.value)}
                                        options={[
                                            { value: "0", label: "Domingo" },
                                            { value: "1", label: "Segunda-feira" },
                                            { value: "2", label: "Terça-feira" },
                                            { value: "3", label: "Quarta-feira" },
                                            { value: "4", label: "Quinta-feira" },
                                            { value: "5", label: "Sexta-feira" },
                                            { value: "6", label: "Sábado" },
                                        ]}
                                    />
                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={e => setScheduleItemValue(index, "from", e.target.value)}
                                    />

                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={e => setScheduleItemValue(index, "to", e.target.value)}
                                    />
                                </div>
                            )
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt=" Aviso importante" />
                   Importante! <br />
                   Preencha todos os dados
                 </p>
                        <button type="submit">
                            Salvar cadastro
                 </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;