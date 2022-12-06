import { CardHeaderProps } from "react-bootstrap/esm/CardHeader";


const CardEnd: React.FC = () => (

    <Card className= "w-100" >
    <Card.Body>
            <Title className="card-text">{title}</Title>
            <p className="mb-8">{`$${price.toFixed(2)}`}</p>
        </div>
    </Card>
    );

export default CardEnd;