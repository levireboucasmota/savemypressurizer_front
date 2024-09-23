import { Container, ContentForm, InputWrapper } from "./styles";

import { Input } from "../../components/Input";
import { Navbar } from "../../components/Navbar";
import { Button } from "../../components/Button";
import { ButtonIcon } from "../../components/ButtonIcon";

import { FiCalendar, FiMail, FiMap, FiMapPin, FiPhone, FiTrash, FiUser } from "react-icons/fi";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";

const addUserSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório!"),
  cep: z.string().refine((val) => val.length === 8, {
    message: "O CEP precisa ter 8 dígitos!"
  }),
  lastName: z.string().min(1, "O sobrenome é obrigatório!"),
  street: z.string().min(1, "A rua é obrigatória!"),
  cpf: z.string().refine((val) => val.length === 11, {
    message: "O CPF precisa ter 11 dígitos!"
  }),
  addressNumber: z.string().min(1, "O número da residência é obrigatório!"),
  email: z.string().email("Insira um e-mail válido!"),
  phoneNumber: z.string().refine((val) => val.length === 11, {
    message: "O número de telefone precisa ter 11 dígitos!"
  }),
  complement: z.string().min(1, "O complemento é obrigatório!"),
  installationDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Insira uma data válida!"
  }),
});


export function AddUser() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(addUserSchema)
  });

  const navigate = useNavigate();

  async function handleAddNewClient(data) {
    const {
      name,
      cep,
      lastName,
      street,
      cpf,
      addressNumber,
      email,
      complement,
      phoneNumber,
      installationDate
    } = data;

    await api.post("/clientes", {
      first_name: name,
      last_name: lastName,
      cpf: cpf,
      email: email.toString(),
      phone: phoneNumber,
      postal_code: cep,
      street: street,
      number: Number(addressNumber),
      complement: complement,
      installation_date: Date(installationDate)
    }).then(() => {
      alert("Cliente cadastrado com sucesso!");
      navigate("/");
    }).catch((error) => {
      if(error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível realizar o cadastro!");
      }
    })   
  }

  return (
    <Container>
      <Navbar />
      <main>
        <ContentForm onSubmit={handleSubmit(handleAddNewClient)}>
          <InputWrapper>
            <Input
              placeholder='Nome'
              icon={FiUser}
              height="80px"
              {...register("name")}
            />
            {errors.name && (
              <p style={{ color: 'red' }}>
                {errors.name.message}
              </p>
            )}
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder='CEP'
              icon={FiMap}
              height="80px"
              {...register("cep")}
            />
            {errors.cep && (
              <p style={{ color: 'red' }}>
                {errors.cep.message}
              </p>
            )}
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder='Sobrenome'
              icon={FiUser}
              height="80px"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p style={{ color: 'red' }}>
                {errors.lastName.message}
              </p>
            )}
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder='Rua'
              icon={FiMapPin}
              height="80px"
              {...register("street")}
            />
            {errors.street && (
              <p style={{ color: 'red' }}>
                {errors.street.message}
              </p>
            )}
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder='CPF'
              icon={FiUser}
              height="80px"
              {...register("cpf")}
            />
            {errors.cpf && (
              <p style={{ color: 'red' }}>
                {errors.cpf.message}
              </p>
            )}
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder='Número'
              type="number"
              icon={FiMapPin}
              height="80px"
              {...register("addressNumber")}
            />
            {errors.addressNumber && (
              <p style={{ color: 'red' }}>
                {errors.addressNumber.message}
              </p>
            )}
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder='E-mail'
              icon={FiMail}
              type='email'
              height="80px"
              {...register("email")}
            />
            {errors.email && (
              <p style={{ color: 'red' }}>
                {errors.email.message}
              </p>
            )}
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder='Complemento'
              icon={FiMapPin}
              height="80px"
              {...register("complement")}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder='Telefone'
              type="number"
              icon={FiPhone}
              height="80px"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <p style={{ color: 'red' }}>
                {errors.phoneNumber.message}
              </p>
            )}
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder='Data de instalação'
              icon={FiCalendar}
              type='date'
              height="80px"
              {...register("installationDate")}
            />
            {errors.installationDate && (
              <p style={{ color: 'red' }}>
                {errors.installationDate.message}
              </p>
            )}
          </InputWrapper>
          <footer>
            <Button
              title='Salvar'
              type="submit"  
            />
            <ButtonIcon icon={FiTrash}/>
          </footer>
        </ContentForm>
      </main>
    </Container>
  )
}