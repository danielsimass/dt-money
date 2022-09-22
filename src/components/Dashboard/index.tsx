import { Summary } from "../Summary";
import { TransactionTable } from "../TransactionTable.tsx";
import { Container } from "./styles";

export function Dashboard () {
    return(
        <Container>
            <Summary />
            <TransactionTable />
        </Container>
    )
}