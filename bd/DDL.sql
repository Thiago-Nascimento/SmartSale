create database BD_SmartSale;

use BD_SmartSale;

create table Tipo_Usuario
(
	Id_TipoUsuario int not null primary key identity,
	Tipo varchar(255) not null
);

create table Categoria
(
	Id_Categoria int not null primary key identity,
	Nome_Categoria varchar(255) not null
);

create table Regiao
(
	Id_Regiao int not null primary key identity,
	Bairro varchar(255) not null,
	Cidade varchar(255) not null,
);

create table Usuario
(
	Id_Usuario int not null primary key identity,
	Nome_Usuario varchar(255) not null,
	Idade int not null,
	Documento VARCHAR(255) not null,
	Email varchar(255) not null,
	Senha varchar(255) not null,
	Telefone VARCHAR(255) not null,
	Telefone_2 VARCHAR(255),
	Endereco varchar(255) not null,
	Cep VARCHAR(255),
	Pontuacao int not null,
	Id_TipoUsuario int foreign key references Tipo_Usuario(Id_TipoUsuario) not null,
	Id_Regiao int foreign key references Regiao(Id_Regiao) not null
);

create table Produto
(
	Id_Produto int identity not null primary key,
	Nome_Produto varchar(255) not null,
	Pontos int,
	Id_Categoria int foreign key references Categoria(Id_Categoria) not null,
);

create table Reserva
(
	Id_Reserva int identity not null primary key,
	Quantidade_Comprada int not null,
	Data_Limite_Retirada DATE not null,
	Id_Usuario int foreign key references Usuario(Id_Usuario) not null,
	Id_Produto int foreign key references Produto(Id_Produto) not null
);

create table Ong
(
	Id_Ong int not null primary key identity,
	Razao_Social varchar(255) not null,
	Cnpj VARCHAR(255) not null,
	Site_Ong VARCHAR(255),
	Sobre text,
	Telefone VARCHAR(255),
	Email varchar(255),
	Endereco varchar(255),
	Id_Regiao int foreign key references Regiao(Id_Regiao) not null
);

create table Doacao
(
	Id_Doacao int identity not null primary key,
	Id_Ong int FOREIGN KEY REFERENCES Ong(Id_Ong) not null,
	Id_Usuario int foreign key references Usuario(Id_Usuario) not null,
	Id_Produto int foreign key references Produto(Id_Produto) not null
);

create table Oferta
(
	Id_Oferta int identity not null primary key,
	Quantidade int not null,
	Foto varchar(255) not null,
	Cor VARCHAR(255),
	Preco float not null,
	Descricao text not null,
	Data_Validade DATE not null,
	Id_Usuario int not null FOREIGN key REFERENCES Usuario(Id_Usuario),
	Id_TipoUsuario int not null foreign key references Tipo_Usuario(Id_TipoUsuario)
);