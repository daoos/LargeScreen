import temp from './impressionTop5.html';
import './impressionTop5.css';


export default class ImpressionTop5 {
    render(node) {
        $(node).append(temp);
    }
}