insert into Tipo_Usuario(Tipo)
VALUES ('Administrador');
insert into Tipo_Usuario(Tipo)
VALUES ('Vendedor');
insert into Tipo_Usuario(Tipo)
VALUES ('Cliente');


insert into Categoria(Nome_Categoria)
VALUES ('Verdura');
insert into Categoria(Nome_Categoria)
VALUES ('Fruta');
insert into Categoria(Nome_Categoria)
VALUES ('Bebida');
insert into Categoria(Nome_Categoria)
VALUES ('Carne');
insert into Categoria(Nome_Categoria)
VALUES ('Laticínio');
insert into Categoria(Nome_Categoria)
VALUES ('Cerreais');
insert into Categoria(Nome_Categoria)
VALUES ('Legume');
insert into Categoria(Nome_Categoria)
VALUES ('Vestuário');
insert into Categoria(Nome_Categoria)
VALUES ('Calçados');


insert into Regiao(Bairro, Cidade)
values ('Guaianases','São Paulo');
insert into Regiao(Bairro, Cidade)
values ('Taboão da Serra','São Paulo');
insert into Regiao(Bairro, Cidade)
values ('Suzano','São Paulo');
insert into Regiao(Bairro, Cidade)
values ('Mogi das Cruzes','São Paulo');
insert into Regiao(Bairro, Cidade)
values ('Santo André','São Paulo');


insert into Usuario(Nome_Usuario,Idade,Documento,Razao_Social,Email,Senha,Telefone,Telefone_2,Endereco,Cep,Pontuacao,Id_TipoUsuario,Id_Regiao)
values ('Larissa Santos', 20, '22233344456','animal de rua', 'MeuEmail@EmailQuente.com', 'senhafraca', '22334455', '33445566', 'Rua da minha casa, 18', '08452250',0, 3,1 );
insert into Usuario(Nome_Usuario,Idade,Documento,Razao_Social,Email,Senha,Telefone,Telefone_2,Endereco,Cep,Pontuacao,Id_TipoUsuario,Id_Regiao)
values ('Vitor Martins', 20, '22233344456', 'animal de rua','MeuEmail@EmailQuente.com', 'senhafraca', '22334455', '33445566', 'Rua da minha casa, 18', '08452250',0, 3,2 );
insert into Usuario(Nome_Usuario,Idade,Documento,Razao_Social,Email,Senha,Telefone,Telefone_2,Endereco,Cep,Pontuacao,Id_TipoUsuario,Id_Regiao)
values ('Thiago Nascimento', 20, '22233344456','animal de rua', 'MeuEmail@EmailQuente.com', 'senhafraca', '22334455', '33445566', 'Rua da minha casa, 18', '08452250',0, 3,3 );
insert into Usuario(Nome_Usuario,Idade,Documento,Razao_Social,Email,Senha,Telefone,Telefone_2,Endereco,Cep,Pontuacao,Id_TipoUsuario,Id_Regiao)
values ('Marcela Alicia', 20, '22233344456','animal de rua', 'MeuEmail@EmailQuente.com', 'senhafraca', '22334455', '33445566', 'Rua da minha casa, 18', '08452250',0, 3,4 );
insert into Usuario(Nome_Usuario,Idade,Documento,Razao_Social,Email,Senha,Telefone,Telefone_2,Endereco,Cep,Pontuacao,Id_TipoUsuario,Id_Regiao)
values ('Carlos Roberto', 20, '22233344456','animal de rua', 'MeuEmail@EmailQuente.com', 'senhafraca', '22334455', '33445566', 'Rua da minha casa, 18', '08452250',0, 3,5 );
insert into Usuario(Nome_Usuario,Idade,Documento,Razao_Social,Email,Senha,Telefone,Telefone_2,Endereco,Cep,Pontuacao,Id_TipoUsuario,Id_Regiao)
values ('Ronaldo Nascimento', 20, '22233344456', 'animal de rua','MeuEmail@EmailQuente.com', 'senhafraca', '22334455', '33445566', 'Rua da minha casa, 18', '08452250',0, 2,5 );
insert into Usuario(Nome_Usuario,Idade,Documento,Razao_Social,Email,Senha,Telefone,Telefone_2,Endereco,Cep,Pontuacao,Id_TipoUsuario,Id_Regiao)
values ('Leonardo Vieira', 20, '22233344456','animal de rua','MeuEmail@EmailQuente.com', 'senhafraca', '22334455', '33445566', 'Rua da minha casa, 18', '08452250',0, 1,5 );


insert into Produto(Nome_Produto,Pontos, Id_Categoria)
values('Tomate', 10, 2);
insert into Produto(Nome_Produto,Pontos, Id_Categoria)
values('Sandália Melissa', 10, 9);
insert into Produto(Nome_Produto,Pontos, Id_Categoria)
values('Biquini rosa Leticia', 10, 8);
insert into Produto(Nome_Produto,Pontos, Id_Categoria)
values('Repolho', 10, 1);
insert into Produto(Nome_Produto,Pontos, Id_Categoria)
values('Alcatra', 10, 4);
insert into Produto(Nome_Produto,Pontos, Id_Categoria)
values('Trigo', 10, 6);
insert into Produto(Nome_Produto,Pontos, Id_Categoria)
values('Vinho', 10, 3);
insert into Produto(Nome_Produto,Pontos, Id_Categoria)
values('Cenoura', 10, 7);
insert into Produto(Nome_Produto,Pontos, Id_Categoria)
values('Queijo prato', 10, 5);


insert into Oferta(Quantidade, Foto, Cor, Preco, Descricao, Data_Validade, Id_Usuario, Id_Produto)
values(5, 'url aqui', 'Rosa', 11.90, 'não sei', '25-06-12', 1, 3);
insert into Oferta(Quantidade, Foto, Cor, Preco, Descricao, Data_Validade, Id_Usuario, Id_Produto)
values(5, 'url aqui', 'Rosa', 11.90, 'não sei', '25-06-12', 2, 4);
insert into Oferta(Quantidade, Foto, Cor, Preco, Descricao, Data_Validade, Id_Usuario, Id_Produto)
values(5, 'url aqui', 'Rosa', 11.90, 'não sei', '25-06-12', 3, 1);
insert into Oferta(Quantidade, Foto, Cor, Preco, Descricao, Data_Validade, Id_Usuario, Id_Produto)
values(5, 'url aqui', 'Rosa', 11.90, 'não sei', '25-06-12', 4, 6);
insert into Oferta(Quantidade, Foto, Cor, Preco, Descricao, Data_Validade, Id_Usuario, Id_Produto)
values(5, 'url aqui', 'Rosa', 11.90, 'não sei', '25-06-12', 5, 8);
insert into Oferta(Quantidade, Foto, Cor, Preco, Descricao, Data_Validade, Id_Usuario, Id_Produto)
values(5, 'url aqui', 'Rosa', 11.90, 'não sei', '25-06-12', 6, 5);


insert into Reserva(Quantidade_Comprada, Valor_Final, Data_Limite_Retirada, Id_Usuario, Id_Oferta)
values(2, 14.90 ,'18-06-12',1,3);
insert into Reserva(Quantidade_Comprada,  Valor_Final, Data_Limite_Retirada, Id_Usuario, Id_Oferta)
values(3, 20.00 , '18-06-12',3,2);
insert into Reserva(Quantidade_Comprada,  Valor_Final, Data_Limite_Retirada, Id_Usuario, Id_Oferta)
values(1, 2.50 , '18-06-12',4,1);
insert into Reserva(Quantidade_Comprada,  Valor_Final, Data_Limite_Retirada, Id_Usuario, Id_Oferta)
values(5, 6.00 , '18-06-12',2,6);
insert into Reserva(Quantidade_Comprada,  Valor_Final, Data_Limite_Retirada, Id_Usuario, Id_Oferta)
values(4, 7.80 , '18-06-12',5,5);
insert into Reserva(Quantidade_Comprada,  Valor_Final, Data_Limite_Retirada, Id_Usuario, Id_Oferta)
values(4, 4.60 , '18-06-12',6,6);
insert into Reserva(Quantidade_Comprada,  Valor_Final, Data_Limite_Retirada, Id_Usuario, Id_Oferta)
values(2, 3.90 ,'18-06-12',5,6);


insert into Ong(Razao_Social,Cnpj,Site_Ong,Sobre_Ong,Telefone_Ong,Email_Ong,Endereco_Ong,Id_Regiao)
VALUES('Instituto viver bem','11111111111111','ongpontocom.com','cuidamos de velhos','222233343','EmailOng@com.com','Virando a esquina, 19',2);
insert into Ong(Razao_Social,Cnpj,Site_Ong,Sobre_Ong,Telefone_Ong,Email_Ong,Endereco_Ong,Id_Regiao)
VALUES('Instituto viver saudavel','11111111111111','ongpontocom.com','cuidamos de velhos','222233343','EmailOng@com.com','Virando a esquina, 19',1);
insert into Ong(Razao_Social,Cnpj,Site_Ong,Sobre_Ong,Telefone_Ong,Email_Ong,Endereco_Ong,Id_Regiao)
VALUES('Instituto viver legal','11111111111111','ongpontocom.com','cuidamos de velhos','222233343','EmailOng@com.com','Virando a esquina, 19',3);
insert into Ong(Razao_Social,Cnpj,Site_Ong,Sobre_Ong,Telefone_Ong,Email_Ong,Endereco_Ong,Id_Regiao)
VALUES('Instituto viver trilegal','11111111111111','ongpontocom.com','cuidamos de velhos','222233343','EmailOng@com.com','Virando a esquina, 19',5);
insert into Ong(Razao_Social,Cnpj,Site_Ong,Sobre_Ong,Telefone_Ong,Email_Ong,Endereco_Ong,Id_Regiao)
VALUES('Instituto viver feliz','11111111111111','ongpontocom.com','cuidamos de velhos','222233343','EmailOng@com.com','Virando a esquina, 19',4);


insert into Doacao(Id_Ong, Id_Oferta)
values(1, 1);
insert into Doacao(Id_Ong, Id_Oferta)
values(3, 3);
insert into Doacao(Id_Ong, Id_Oferta)
values(2, 5);






