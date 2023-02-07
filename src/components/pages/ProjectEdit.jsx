import { parse, v4 as uuidv4 } from 'uuid'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import styles from './ProjectEdit.module.css'

import Loading from  "../layouts/Loading"
import Container from '../layouts/Container'
import ProjectForm from '../Projects/ProjectForm'
import ServiceForm from '../services/ServiceForm'
import ServiceCard from '../services/ServiceCard'
import Message from '../layouts/Message';

function ProjectEdit() {
  let { id } = useParams()
  const [project, setProject] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [services, setServices] = useState([])
  const [message, setMessage] = useState('')
  const [type, setType] = useState('success')
  

  useEffect(() => {
    // 
        fetch(`https://back-end-costs-production.up.railway.app/projetos/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProject(data)
            setServices(data.servicos)
            
          })
  }, [project])

  
  function editPost(project) {
    // budget validation
    if (project.orcamento < project.custo) {

    setMessage('O Orçamento não pode ser menor que o custo do projeto!')
    setType('error')
      return false
    }

    fetch(`https://back-end-costs-production.up.railway.app/projetos/${project._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project)
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data)
        setShowProjectForm(!showProjectForm)
      })
  }

  function createService(project, service) {
     // verifica se o custo do serviço é maior que o orçamento
     const ServiceCost = parseFloat(service.custoServico) + parseFloat(project.custo)
    
    if (service.custoServico > parseFloat(project.orcamento)) {
      setMessage('Orçamento ultrapassado, verifique o valor do serviço!')
      setType('error')
      return false
    } //verifica se o valor do orçamento com a soma do servio iras er maior que o orçamento do projeto
    else if(ServiceCost > parseFloat(project.orcamento)){
      setMessage('Valor do Projeto irá ultrapassar o orçamento!')
      setType('error')
      return false
    }
   
    fetch(`https://back-end-costs-production.up.railway.app/projetos/${project._id}`, { // Adiciona o Serviço no Banco de Dados
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(service)
       })
       .then(resp => resp.json())
       .then((data) => {
        setServices(data)
       })
       

    // last service
    const lastService = service
    lastService.id = uuidv4()

    const lastServiceCost = lastService.custoServico
    
    const newCost = parseFloat(project.custo) + parseFloat(lastServiceCost)

    // add service cost to project cost total
    project.custo = newCost
  
    fetch(`https://back-end-costs-production.up.railway.app/projetos/${project._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data)
        setShowServiceForm(!showServiceForm)
          setMessage('Servico Adicionado!')
          setType('success')
      })
  }

  

  function removeService(id, cost) {
    const servicesUpdated = project.servicos.filter(
      (service) => service.id !== id,
    )
   
    const projectUpdated = project

    projectUpdated.servicos = servicesUpdated
    projectUpdated.custo = parseFloat(projectUpdated.custo) - parseFloat(cost)
   
    fetch(`https://back-end-costs-production.up.railway.app/projetos/${projectUpdated._id}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectUpdated)
    }).then(resp => resp.json())
      .then((data) => {
        setProject(projectUpdated)
        setServices(servicesUpdated)
        setMessage('Serviço removido com sucesso!')
        setType('error')
        //mensagem de serviço deletado com sucesso
      })
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }
  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm)
  }

  return (
    <>
      {project.nome ? (
        <div className={styles.project_details}>
          <Container customClass="column">
          {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.nome}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
              </button>
              {!showProjectForm ? (
                <div className={styles.form}>
                  <p>
                    <span>Categoria:</span> {project.categoria.name}
                  </p>
                  <p>
                    <span>Total do orçamento:</span> R${project.orcamento}
                  </p>
                  <p>
                    <span>Total utilizado:</span> R${project.custo}
                  </p>
                </div>
              ) : (
                <div className={styles.form}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir Edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
              </button>
              <div className={styles.form}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={project}
                  />
                
                ) }
              </div>
            </div>
            <h2>Serviços:</h2>
          
                <Container customClass="start">
                  {services.length > 0 &&
                    services.map((service) => (
                      <ServiceCard
                        id={service.id}
                        name={service.nomeServico}
                        cost={service.custoServico}
                        description={service.descricao}
                        key={service.id}
                        handleRemove={removeService}
                      />
                    ))}
                  {services.length === 0 && <p>Não há serviços cadastrados.</p>}
                    </Container>
            
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default ProjectEdit;