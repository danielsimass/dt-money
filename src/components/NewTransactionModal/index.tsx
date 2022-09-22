import Modal from 'react-modal'
import { Container, TransactionTypeContainer, Button } from './styles';
import closeImg from "../../assets/close.svg"
import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"
import { FormEvent,  useState } from 'react';
import {  useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}
export const NewTransactionModal = ({isOpen, onRequestClose}: NewTransactionModalProps) => {
    const [type, setType] = useState('deposit')

    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')
    
    const { createTransaction } = useTransactions()

    const handleSubmitForm = async (event: FormEvent) => {
        event.preventDefault()

        await createTransaction({
            title,
            amount,
            category,
            type
        })
        onRequestClose()
    }
    return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
        <button 
          type='button' 
          onClick={onRequestClose} 
          className='react-modal-close'>
            <img src={closeImg} alt="FEchar modal" />
        </button>
        <Container onSubmit={handleSubmitForm}>
            <h2>Cadastrar transação</h2>

            <input
                placeholder='Título'
                value={title}
                onChange={event => setTitle(event.target.value)}
            />
            <input
                type='number'
                placeholder='Valor'
                value={amount}
                onChange={event => setAmount(+event.target.value)}
            />
            <TransactionTypeContainer>
                <Button
                  type='button'
                  onClick={() => setType('deposit')}
                  isActive={type === 'deposit'}
                  colorActive='green'
                >
                    <img src={incomeImg} alt="Entrada" />
                    <span>Entrada</span>
                </Button>

                <Button
                  type='button'
                  onClick={() => setType('withdraw')}
                  isActive={type === 'withdraw'}
                  colorActive='red'
                >
                    <img src={outcomeImg} alt="Saída" />
                    <span>Saída</span>
                </Button>
            </TransactionTypeContainer>
            <input
                placeholder='Categoria'
                value={category}
                onChange={event => setCategory(event.target.value)}
            />
            
            <button type='submit'> Cadastrar</button>
        </Container>
    </Modal>
    )
}