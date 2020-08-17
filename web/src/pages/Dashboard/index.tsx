import React, { useEffect, useState } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

import { Container } from './styles';

import HeaderVertical from '../../components/HeaderVertical';
import api from '../../services/api';

interface Client {
  id: string;
  name: string;
  email: string;
  telephone: string;
  telephone_array: { id: string; telephone_number: string}[];
  created_at: string;
}

interface ClientsResponse {
  clients: Client[];
}

interface Contact {
  id: string;
  name: string;
  email: string;
  telephone: string;
  telephone_array: { id: string; telephone_number: string}[];
  client_id: string;
}

interface ContactsResponse {
  contacts: Contact[];
}

const Dashboard: React.FC = () => {

  const [numberClients, setNumberClients] = useState(Number);
  const [numberContacts, setNumberContacts] = useState(Number);

  useEffect(() => {
    api.get<ClientsResponse>('clients').then(response => {
      setNumberClients(response.data.clients.length)
    });

    api.get<ContactsResponse>('contacts').then(response => {
      setNumberContacts(response.data.contacts.length)
    });

    let chart = am4core.create("chartdiv", am4charts.PieChart);

    chart.legend = new am4charts.Legend();


    let series = chart.series.push(new am4charts.PieSeries());
      series.dataFields.value = "quantity";
      series.dataFields.category = "clients";

    chart.data = [{
      "clients": "Clientes",
      "quantity": numberClients
    }, {
      "clients": "Contatos",
      "quantity": numberContacts
    }];
  })

  return (
    <>
      <Container>
        <HeaderVertical />
        <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
      </Container>
    </>
  );
};

export default Dashboard;
