import React from "react";
import { Page, Text, Document, StyleSheet, View } from "@react-pdf/renderer";
import type { AccessibilityResults } from "../interfaces/AccessibilityResults";
import type { ContrastItem } from "../interfaces/ResultContrast";

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#000",
  },
  header: {
    backgroundColor: "#2563EB",
    padding: 8,
    borderRadius: 4,
    marginBottom: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginTop: 20,
    marginBottom: 4,
  },
  label: {
    fontWeight: 700,
    fontSize: 12,
  },
  paragraph: {
    borderRadius: 4,
    marginBottom: 2,
    padding: 4,
    fontSize: 12,
  },
  itemContainerHeightLight: {
    backgroundColor: "#EFF6FF",
    borderRadius: 4,
    marginBottom: 6,
    padding: 4,
  },
  itemContainer: {
    borderRadius: 4,
    marginBottom: 6,
    padding: 4,
  },
  successMessage: {
    color: "#22c55e",
    marginBottom: 8,
    fontSize: 12,
  },
  item: {
    marginBottom: 6,
    lineHeight: 1.4,
  },
  description: {
    color: "#6B7280",
    marginBottom: 8,
  },
  totalErrorMessage: {
    color: "#DC2626",
    marginBottom: 8,
    fontSize: 12,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 32,
    right: 32,
    textAlign: "center",
    fontSize: 10,
    color: "#6B7280",
  },
});

interface ReportPDFProps {
  result: AccessibilityResults | null;
  contrastResult: ContrastItem[];
  url: string;
}

export const ReportPDF: React.FC<ReportPDFProps> = ({
  result,
  contrastResult,
  url,
}) => {
  if (!result) {
    return (
      <Document>
        <Page style={styles.page}>
          <Text style={styles.paragraph}>
            Nenhum dado disponível para gerar relatório.
          </Text>
          <Text style={styles.footer}>Relatório gerado por A11y_Inspector</Text>
        </Page>
      </Document>
    );
  }
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            A11y_Inspector - Relatório de Acessibilidade
          </Text>
        </View>

        <Text>URL analisada: {url || "Não informada"}</Text>
        <Text>Data: {new Date().toLocaleString("pt-BR")}</Text>

        <Text style={styles.sectionTitle}>
          Imagens sem descrição (alt) -{" "}
          {result && result.images.length === 0 ? (
            <Text style={styles.successMessage}>
              Todas as imagens possuem texto alternativo.
            </Text>
          ) : (
            <Text style={styles.totalErrorMessage}>
              {result.images.length}{" "}
              {result.images.length === 1
                ? "Problema encontrado"
                : "Problemas encontrados"}
            </Text>
          )}
        </Text>
        <Text style={styles.description}>
          Todas as imagens devem ter texto alternativo para leitores de tela.
        </Text>
        {result && result.images.length
          ? result.images.map((img, index: number) => {
              return (
                <View
                  key={img.src}
                  style={
                    index % 2 === 0
                      ? styles.itemContainerHeightLight
                      : styles.itemContainer
                  }
                >
                  <Text style={styles.paragraph}>
                    <Text style={styles.label}>html: </Text>
                    {img.html}
                  </Text>
                  <Text style={styles.paragraph}>
                    <Text style={styles.label}>src: </Text>
                    {img.src}
                  </Text>
                </View>
              );
            })
          : null}
        <Text style={styles.sectionTitle}>
          Campos de formulário sem rótulo -{" "}
          {result && result.forms.length === 0 ? (
            <Text style={styles.successMessage}>
              Nenhum problema encontrado
            </Text>
          ) : (
            <Text style={styles.totalErrorMessage}>
              {result.forms.length}{" "}
              {result.forms.length === 1 ? "Problema" : "Problemas"}{" "}
              {result.forms.length === 1 ? "encontrado." : "encontrados."}
            </Text>
          )}
        </Text>
        <Text style={styles.description}>
          {"Cada campo deve ter um <label>(rótulo) associado."}
        </Text>
        {result && result.forms.length
          ? result.forms.map((form, index: number) => {
              return (
                <View
                  key={form.html}
                  style={
                    index % 2 === 0
                      ? styles.itemContainerHeightLight
                      : styles.itemContainer
                  }
                >
                  <Text style={styles.paragraph}>
                    <Text style={styles.label}>html: </Text>
                    {form.html}
                  </Text>
                  <Text style={styles.paragraph}>
                    <Text style={styles.label}>mensagem: </Text>
                    {form.message}
                  </Text>
                </View>
              );
            })
          : null}
        <Text style={styles.sectionTitle}>
          Problemas na hierarquia de títulos -{" "}
          {result && result.headings.length === 0 ? (
            <Text style={styles.successMessage}>
              Nenhum problema encontrado
            </Text>
          ) : (
            <Text style={styles.totalErrorMessage}>
              {result.headings.length}{" "}
              {result.headings.length === 1 ? "Problema" : "Problemas"}{" "}
              {result.headings.length === 1 ? "encontrado." : "encontrados."}
            </Text>
          )}
        </Text>
        <Text style={styles.description}>
          {"Use apenas um <h1>(título) e evite pular níveis."}
        </Text>

        {result && result.headings.length
          ? result.headings.map((head, index: number) => {
              return (
                <View
                  key={index}
                  style={
                    index % 2 === 0
                      ? styles.itemContainerHeightLight
                      : styles.itemContainer
                  }
                >
                  <Text style={styles.paragraph}>{head}</Text>
                </View>
              );
            })
          : null}
        <Text style={styles.sectionTitle}>
          Links com texto vago -{" "}
          {result && result.links.length === 0 ? (
            <Text style={styles.successMessage}>
              Nenhum problema encontrado
            </Text>
          ) : (
            <Text style={styles.totalErrorMessage}>
              {result.links.length}{" "}
              {result.links.length === 1 ? "Problema" : "Problemas"}{" "}
              {result.links.length === 1 ? "encontrado." : "encontrados."}
            </Text>
          )}
        </Text>
        <Text style={styles.description}>
          Evite usar textos genéricos como “clique aqui” em links. Prefira
          descrições que indiquem o destino ou a ação.
        </Text>

        {result && result.links.length
          ? result.links.map((link, index: number) => {
              return (
                <View
                  key={index}
                  style={
                    index % 2 === 0
                      ? styles.itemContainerHeightLight
                      : styles.itemContainer
                  }
                >
                  <Text style={styles.paragraph}>{link}</Text>
                </View>
              );
            })
          : null}
        <Text style={styles.sectionTitle}>
          Botões sem rótulo acessível -{" "}
          {result && result.buttons.length === 0 ? (
            <Text style={styles.successMessage}>
              Nenhum problema encontrado
            </Text>
          ) : (
            <Text style={styles.totalErrorMessage}>
              {result.buttons.length}{" "}
              {result.buttons.length === 1 ? "Problema" : "Problemas"}{" "}
              {result.buttons.length === 1 ? "encontrado." : "encontrados."}
            </Text>
          )}
        </Text>
        <Text style={styles.description}>
          Todos os botões devem ter texto visível ou atributos como aria-label.
        </Text>

        {result && result.buttons.length
          ? result.buttons.map((button, index: number) => {
              return (
                <View
                  key={button.id}
                  style={
                    index % 2 === 0
                      ? styles.itemContainerHeightLight
                      : styles.itemContainer
                  }
                >
                  <Text style={styles.paragraph}>
                    <Text style={styles.label}>id: </Text>
                    {button.id}
                  </Text>
                  <Text style={styles.paragraph}>
                    <Text style={styles.label}>html: </Text>
                    {button.html}
                  </Text>
                  <Text style={styles.paragraph}>
                    <Text style={styles.label}>mensagem: </Text>
                    {button.message}
                  </Text>
                </View>
              );
            })
          : null}
        <Text style={styles.sectionTitle}>
          Landmarks semânticos ausentes -{" "}
          {result && result.landmarks.length === 0 ? (
            <Text style={styles.successMessage}>
              Nenhum problema encontrado
            </Text>
          ) : (
            <Text style={styles.totalErrorMessage}>
              {result.landmarks.length}{" "}
              {result.landmarks.length === 1 ? "Problema" : "Problemas"}{" "}
              {result.landmarks.length === 1 ? "encontrado." : "encontrados."}
            </Text>
          )}
        </Text>
        <Text style={styles.description}>
          {
            "É necessário usar as tags semânticas: <main>, <nav>, <header>, <footer>, para organizar a estrutura da página."
          }
        </Text>

        {result && result.landmarks.length
          ? result.landmarks.map((landmark, index: number) => {
              return (
                <View
                  key={index}
                  style={
                    index % 2 === 0
                      ? styles.itemContainerHeightLight
                      : styles.itemContainer
                  }
                >
                  <Text style={styles.paragraph}>{landmark}</Text>
                </View>
              );
            })
          : null}
        <Text style={styles.sectionTitle}>
          Problemas de Contraste -{" "}
          {contrastResult.length === 0 ? (
            <Text style={styles.successMessage}>
              Nenhum problema encontrado
            </Text>
          ) : (
            <Text style={styles.totalErrorMessage}>
              {contrastResult.length}{" "}
              {contrastResult.length === 1 ? "Problema" : "Problemas"}{" "}
              {contrastResult.length === 1 ? "encontrado." : "encontrados."}
            </Text>
          )}
        </Text>
        <Text style={styles.description}>
          Todos os textos devem ter contraste suficiente com o fundo para
          garantir legibilidade.
        </Text>

        {contrastResult.length
          ? contrastResult.map((contrast, index: number) => {
              return (
                <View
                  key={index}
                  style={
                    index % 2 === 0
                      ? styles.itemContainerHeightLight
                      : styles.itemContainer
                  }
                >
                  <Text style={styles.paragraph}>
                    <Text style={styles.label}>text: </Text>
                    {contrast.text ? contrast.text : "N/A"}
                  </Text>
                  <Text style={styles.paragraph}>
                    <Text style={styles.label}>color: </Text>
                    {contrast.color ? contrast.color : "N/A"}
                  </Text>
                  <Text style={styles.paragraph}>
                    <Text style={styles.label}>background: </Text>
                    {contrast.background ? contrast.background : "N/A"}
                  </Text>
                </View>
              );
            })
          : null}
        <Text style={styles.footer}>
          © 2025 por Elisiane Quadros — Desenvolvido com A11y_Inspector
        </Text>
      </Page>
    </Document>
  );
};
