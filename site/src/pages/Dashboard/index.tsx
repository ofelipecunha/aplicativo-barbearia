import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { format, parseISO, isAfter, isToday } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiPower, FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
  Section,
  Appointment,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface AgendamentoApi {
  id: number;
  data_hora: string;
  cliente: { nome: string };
  servico?: { descricao: string };
  cabeleireiro?: { nome: string };
}

interface AppointmentDisplay {
  id: number;
  date: string;
  hourFormatted: string;
  clienteNome: string;
  servicoDescricao: string;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState<AppointmentDisplay[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (!modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    setLoading(true);
    const dataStr = format(selectedDate, 'yyyy-MM-dd');
    api
      .get<AgendamentoApi[]>('/agendamentos', { params: { data: dataStr } })
      .then((response) => {
        const list = (response.data || []).map((ag) => ({
          id: ag.id,
          date: ag.data_hora,
          hourFormatted: format(parseISO(ag.data_hora), 'HH:mm'),
          clienteNome: ag.cliente?.nome || 'Cliente',
          servicoDescricao: ag.servico?.descricao || 'Serviço',
        }));
        setAppointments(list);
      })
      .catch(() => setAppointments([]))
      .finally(() => setLoading(false));
  }, [selectedDate, user?.id]);

  const selectedDateAsText = useMemo(
    () =>
      format(selectedDate, "'Dia' dd 'de' MMMM", {
        locale: ptBR,
      }),
    [selectedDate],
  );

  const selectedWeekDay = useMemo(
    () =>
      format(selectedDate, 'cccc', {
        locale: ptBR,
      }),
    [selectedDate],
  );

  const morningAppointments = useMemo(
    () =>
      appointments.filter((a) => parseISO(a.date).getHours() < 12),
    [appointments],
  );

  const afternoonAppointments = useMemo(
    () =>
      appointments.filter((a) => parseISO(a.date).getHours() >= 12),
    [appointments],
  );

  const nextAppointment = useMemo(
    () =>
      appointments.find((a) =>
        isAfter(parseISO(a.date), new Date()),
      ),
    [appointments],
  );

  const avatarUrl = user?.avatar || undefined;

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Barbearia" />

          <Profile>
            <img
              src={avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.nome || 'U')}&background=ff9000&color=312e38`}
              alt={user?.nome || ''}
            />
            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                <strong>{user?.nome}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          {loading && (
            <p style={{ color: '#999591', marginTop: 24 }}>Carregando...</p>
          )}

          {!loading && isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Agendamento a seguir</strong>
              <div>
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(nextAppointment.clienteNome)}&background=3e3b47&color=ff9000`}
                  alt={nextAppointment.clienteNome}
                />
                <strong>{nextAppointment.clienteNome}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hourFormatted} - {nextAppointment.servicoDescricao}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Manhã</strong>
            {!loading && morningAppointments.length === 0 && (
              <p>Nenhum agendamento para este período</p>
            )}
            {morningAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>
                <div>
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(appointment.clienteNome)}&background=3e3b47&color=ff9000`}
                    alt={appointment.clienteNome}
                  />
                  <strong>
                    {appointment.clienteNome} - {appointment.servicoDescricao}
                  </strong>
                </div>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>
            {!loading && afternoonAppointments.length === 0 && (
              <p>Nenhum agendamento para este período</p>
            )}
            {afternoonAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>
                <div>
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(appointment.clienteNome)}&background=3e3b47&color=ff9000`}
                    alt={appointment.clienteNome}
                  />
                  <strong>
                    {appointment.clienteNome} - {appointment.servicoDescricao}
                  </strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>

        <Calendar>
          <DayPicker
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }]}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
