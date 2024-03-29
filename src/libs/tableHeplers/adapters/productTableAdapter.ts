import { IProduct } from "../../../interfaces/models";
import { TableData } from "../../../components/Tables/TableTempalte";

const productTableAdapter = (data: IProduct[]): TableData | never => {
  if (!data) throw new Error("No data");
  const columnsNames = Object.keys(data[0]);
  const rowsData = data.map((rowObj) => {
    const row = Object.values(rowObj);
    return row;
  });

  return { columnsNames, rowsData };
};

export default productTableAdapter;
